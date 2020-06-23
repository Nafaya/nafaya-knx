/*
KNX DIB(Description Information Block) header
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Structure Length              | Description Type Code         |
| (1 octet)                     | (1 octet)                     |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Description Information Block data                            |
| (?? octets)                                                   |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
*/

const { Buffer } = require('buffer');
const BaseKNXStructure = require('../BaseKNXStructure');

class DIBHeader extends BaseKNXStructure {
    constructor(data) {
        super(data);
    }
    static fromBuffer(buffer) {
        return {
            structure_length      : buffer.readUInt8(0),
            description_type_code : buffer.readUInt8(1)
        }
    }
    static toBuffer({ structure_length, description_type_code }) {
        const buffer = Buffer.alloc(2);
        buffer.writeUInt8(structure_length, 0);
        buffer.writeUInt8(description_type_code, 1);
        return buffer;
    }
    static KNX_ATTRIBUTES = ['structure_length', 'description_type_code'];
}

module.exports = DIBHeader;
