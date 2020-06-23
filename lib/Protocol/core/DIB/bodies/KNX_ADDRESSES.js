/*
KNX Addresses DIB
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Structure Length              | Description Type Code         |
| (1 octet)                     | (1 octet)                     |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| KNX Individual Address                                        |
| (2 octets)                                                    |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Additional Individual Address 1 (optional)                    |
| (2 octets)                                                    |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Additional Individual Address 2 (optional)                    |
| (2 octets)                                                    |
+- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+
| ...                                                           |
|                                                               |
+- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+
*/
const { Buffer } = require('buffer');
const BaseKNXStructure = require('../../../BaseKNXStructure');
const IndividualAddress = require('../../IndividualAddress');
const {
    DESCRIPTION_TYPE_CODES: { KNX_ADDRESSES }
} = require('../../../constants');

class DIBBody__KNX_ADDRESSES extends BaseKNXStructure {
    constructor(data) {
        super(data);
        this.description_type_code = KNX_ADDRESSES;
    }
    static fromBuffer(buffer) {
        const additional_individual_addresses = [];
        for (let i=2; i<buffer.length; ++i) {
            additional_individual_addresses.push(IndividualAddress.from(buffer.slice(2*i,2*i+1)));
        }
        return {
            knx_individual_address : IndividualAddress.from(buffer.slice(0,2)),
            additional_individual_addresses
        }
    }
    static toBuffer({ knx_individual_address, additional_individual_addresses }) {
        return Buffer.from([
            knx_individual_address.toBuffer(),
            ...additional_individual_addresses.map(v => v.toBuffer())
        ]);
    }
    static KNX_ATTRIBUTES = ['knx_individual_address', 'additional_individual_addresses'];
}

module.exports = DIBBody__KNX_ADDRESSES;
