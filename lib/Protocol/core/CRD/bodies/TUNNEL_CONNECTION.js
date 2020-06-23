/*
Connection Response Data Block (CRD)
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Structure Length              | TUNNEL_CONNECTION             |
| (1 octet = 04h)               | (1 octet = 04h)               |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
| KNX Individual Address                                        |
| (2 Octets)                                                    |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
*/

const BaseKNXStructure = require('../../../BaseKNXStructure');
const IndividualAddress = require('../../IndividualAddress');
const {
    CONNECTION_TYPES: { TUNNEL_CONNECTION }
} = require('../../../constants');

class CRDBody__TUNNEL_CONNECTION extends BaseKNXStructure {
    constructor(data) {
        super(data);
        this.connection_type = TUNNEL_CONNECTION;
    }
    static fromBuffer(buffer) {
        return {
            knx_individual_address : IndividualAddress.from(buffer),
        }
    }
    static toBuffer({ knx_individual_address }) {
        return knx_individual_address.toBuffer();
    }
    static KNX_ATTRIBUTES = ['knx_individual_address'];
}

module.exports = CRDBody__TUNNEL_CONNECTION;
