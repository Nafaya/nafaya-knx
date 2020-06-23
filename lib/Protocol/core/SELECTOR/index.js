/*
KNX SELECTOR
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Structure Length              | Selector Type Code            |
| (1 octet)                     | (1 octet)                     |
+- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+
|                                                               |
|                                                               |
+- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+
*/

const { Buffer } = require('buffer');
const BaseKNXStructure = require('../../BaseKNXStructure');
const SELECTORHeader = require('./header');
const {
    SELECTOR_TYPE_CODES
} = require('../../constants');
function getDIBBodyClass(selector_type_code){
    return require(`./bodies/${SELECTOR_TYPE_CODES[selector_type_code] || 'Unsupported'}`);
}

class SELECTOR extends BaseKNXStructure {
    constructor(data) {
        if (!(data instanceof Buffer)) {
            if (!(data.header instanceof SELECTORHeader)) data.header = SELECTORHeader.from(data.header);
        }
        super(data);
    }
    update(data) {
        if (data.header) super.update({ header : data.header });
        if (!this.body || this.header.selector_type_code !== this.body.selector_type_code) this.body = getDIBBodyClass(this.header.selector_type_code).from(data.body);
        else if (data.body) super.update({ body : data.body });
    }
    static fromBuffer(buffer) {
        const header = SELECTORHeader.from(buffer.slice(0, 2));
        const body = getDIBBodyClass(header.selector_type_code).from(buffer.readUInt8(2));

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

module.exports = SELECTOR;
