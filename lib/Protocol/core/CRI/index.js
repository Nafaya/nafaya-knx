/*
KNX CRI(Connection Request Information)
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Structure Length              | Connection Type Code          |
| (1 Octet)                     | (1 Octet)                     |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Host Protocol Independent Data                                |
| (variable length, optional)                                   |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
|                                                               |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
|                                                               |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Host Protocol Dependent Data                                  |
| (variable length, optional)                                   |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
|                                                               |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
*/

const { Buffer } = require('buffer');
const BaseKNXStructure = require('../../BaseKNXStructure');
const CRIHeader = require('./header');
const {
    CONNECTION_TYPES
} = require('../../constants');
function getDIBBodyClass(connection_type){
    return require(`./bodies/${CONNECTION_TYPES[connection_type] || 'Unsupported'}`);
}

class CRI extends BaseKNXStructure {
    constructor(data) {
        if (!(data instanceof Buffer)) {
            if (!(data.header instanceof CRIHeader)) data.header = CRIHeader.from(data.header);
        }
        super(data);
    }
    update(data) {
        if (data.header) super.update({ header : data.header });
        if (!this.body || this.header.connection_type !== this.body.connection_type) this.body = getDIBBodyClass(this.header.connection_type).from(data.body);
        else if (data.body) super.update({ body : data.body });
    }
    static fromBuffer(buffer) {
        const header = CRIHeader.from(buffer.slice(0, 2));
        const body = getDIBBodyClass(header.connection_type).from(buffer.readUInt8(2));

        return {
            header,
            body
        }
    }
    static toBuffer({ header, body }) {
        header.update({ structure_length: 2 + body.toBuffer().length });
        return Buffer.concat([header.toBuffer(), body.toBuffer()]);
    }
    static KNX_ATTRIBUTES = ['header', 'body'];
}

module.exports = CRI;
