/*
KNX CRD(Connection Response Data Block)
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
const BaseKNXStructure = require('../BaseKNXStructure');

class CRDHeader extends BaseKNXStructure {
    constructor(data) {
        super(data);
    }
    static fromBuffer(buffer) {
        return {
            structure_length : buffer.readUInt8(0),
            connection_type  : buffer.readUInt8(1)
        }
    }
    static toBuffer({ structure_length, connection_type }) {
        const buffer = Buffer.alloc(2);
        buffer.writeUInt8(structure_length, 0);
        buffer.writeUInt8(connection_type, 1);
        return buffer;
    }
    static KNX_ATTRIBUTES = ['structure_length', 'connection_type'];
}

module.exports = CRDHeader;
