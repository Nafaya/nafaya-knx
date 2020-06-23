/*
Supported services families DIB
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Structure Length              | Description Type Code         |
| (1 octet)                     | (1 octet)                     |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Service Family ID             | Service Family version        |
| (1 Octet)                     | (1 Octet)                     |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Service Family ID             | Service Family version        |
| (1 Octet)                     | (1 Octet)                     |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| ....                          | ....                          |
|                               |                               |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Service Family ID             | Service Family version        |
| (1 Octet)                     | (1 Octet)                     |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
*/
const { Buffer } = require('buffer');
const BaseKNXStructure = require('../../../BaseKNXStructure');
const {
    DESCRIPTION_TYPE_CODES: { SUPP_SVC_FAMILIES }
} = require('../../../constants');

class DIBBody__SUPP_SVC_FAMILIES extends BaseKNXStructure {
    constructor(data) {
        super(data);
        this.description_type_code = SUPP_SVC_FAMILIES;
    }
    static fromBuffer(buffer) {
        const supported_service_families = [];
        for (let i=0;i < buffer.length; ++i) {
            supported_service_families.push({
                id      : buffer.readUInt8(i*2),
                version : buffer.readUInt8(i*2+1)
            })
        }

        return {
            supported_service_families
        }
    }
    static toBuffer({ supported_service_families }) {
        return Buffer.concat(supported_service_families.map(({ id, version }) => {
            return Buffer.from([id, version]);
        }))
    }
    static KNX_ATTRIBUTES = ['supported_service_families'];
}

module.exports = DIBBody__SUPP_SVC_FAMILIES;
