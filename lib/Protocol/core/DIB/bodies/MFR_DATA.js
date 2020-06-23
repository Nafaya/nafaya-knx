/*
Manufacturer data DIB
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Structure Length              | Description Type Code         |
| (1 octet)                     | (1 octet)                     |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| KNX Manufacturer ID                                           |
| (2 Octets)                                                    |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Any manufacturer specific data                                |
| (?? Octets)                                                   |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
*/
const { Buffer } = require('buffer');
const BaseKNXStructure = require('../../../BaseKNXStructure');
const {
    DESCRIPTION_TYPE_CODES: { MFR_DATA }
} = require('../../../constants');

class DIBBody__MFR_DATA extends BaseKNXStructure {
    constructor(data) {
        super(data);
        this.description_type_code = MFR_DATA;
    }
    static fromBuffer(buffer) {
        return {
            manufacturer_id: buffer.readUInt16BE(0),
            manufactorer_specific_data: buffer.slice(2)
        }
    }
    static toBuffer({ manufacturer_id, manufactorer_specific_data }) {
        const buffer_manufacturer_id = Buffer.alloc(2);
        buffer_manufacturer_id.writeUInt16BE(manufacturer_id, 0);
        return Buffer.concat([
            buffer_manufacturer_id,
            manufactorer_specific_data
        ]);
    }
    static KNX_ATTRIBUTES = ['manufacturer_id', 'manufactorer_specific_data'];
}

module.exports = DIBBody__MFR_DATA;
