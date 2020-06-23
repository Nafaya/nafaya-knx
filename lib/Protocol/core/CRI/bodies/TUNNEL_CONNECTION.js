/*
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Structure Length              | TUNNEL_CONNECTION             |
| (1 octet = 04h)               | (1 octet = 04h)               |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
| KNX Layer                     | reserved                      |
| (1 octet)                     | (1 octet)                     |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
*/
const { Buffer } = require('buffer');
const BaseKNXStructure = require('../../../BaseKNXStructure');
const {
    CONNECTION_TYPES: { TUNNEL_CONNECTION }
} = require('../../../constants');

class CRIBody__TUNNEL_CONNECTION extends BaseKNXStructure {
    constructor(data) {
        super(data);
        this.connection_type = TUNNEL_CONNECTION;
    }
    static fromBuffer(buffer) {
        return {
            knx_layer: buffer.readUInt8(0)
        }
    }
    static toBuffer({ knx_layer }) {
        return Buffer.from([knx_layer, 0]);
    }
    static KNX_ATTRIBUTES = ['knx_layer'];
}

module.exports = CRIBody__TUNNEL_CONNECTION;
