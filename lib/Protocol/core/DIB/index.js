/*
KNX DIB(Description Information Block)
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Structure Length              | Description Type Code         |
| (1 octet)                     | (1 octet)                     |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Description Information Block data                            |
| (?? octets)                                                   |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
*/

const { Buffer } = require('buffer');
const BaseKNXStructure = require('../../BaseKNXStructure');
const DIBHeader = require('./header');
const {
    DESCRIPTION_TYPE_CODES
} = require('../../constants');
function getDIBBodyClass(description_type_code){
    return require(`./bodies/${DESCRIPTION_TYPE_CODES[description_type_code] || 'Unsupported'}`);
}

class DIB extends BaseKNXStructure {
    constructor(data) {
        if (!(data instanceof Buffer)) {
            if (!(data.header instanceof DIBHeader)) data.header = DIBHeader.from(data.header);
        }
        super(data);
    }
    update(data) {
        if (data.header) super.update({ header : data.header });
        if (!this.body || this.header.description_type_code !== this.body.description_type_code) this.body = getDIBBodyClass(this.header.description_type_code).from(data.body);
        else if (data.body) super.update({ body : data.body });
    }
    static fromBuffer(buffer) {
        const header = DIBHeader.from(buffer.slice(0, 2));
        const body = getDIBBodyClass(header.description_type_code).from(buffer.readUInt8(2));

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

module.exports = DIB;
