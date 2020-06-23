/*
IP Current Config DIB
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Structure Length              | Description Type Code         |
| (1 octet)                     | (1 octet)                     |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Current IP Address                                            |
| (4 octets)                                                    |
+- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+
|                                                               |
|                                                               |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Current Subnet Mask                                           |
| (4 octets)                                                    |
+- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+
|                                                               |
|                                                               |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Current Default Gateway                                       |
| (4 octets)                                                    |
+- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+
|                                                               |
|                                                               |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| DHCP Server                                                   |
| (4 octets)                                                    |
+- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+
|                                                               |
|                                                               |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+- - - - - - - - - - - - - - - -+
| Current IP assignment method  | Reserved                      |
| (1 Octet)                     | (1 Octet)                     |
+- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+
*/
const { Buffer } = require('buffer');
const BaseKNXStructure = require('../../../BaseKNXStructure');
const {
    DESCRIPTION_TYPE_CODES: { IP_CUR_CONFIG }
} = require('../../../constants');

class DIBBody__IP_CUR_CONFIG extends BaseKNXStructure {
    constructor(data) {
        super(data);
        this.description_type_code = IP_CUR_CONFIG;
    }
    static fromBuffer(buffer) {
        return {
            ip_address  : buffer.slice(0,4).join('.'),
            subnet_mask : buffer.slice(4,8).join('.'),
            default_gateway : buffer.slice(8,12).join('.'),
            dhcp_server : buffer.slice(12,16).join('.'),
            ip_assigment_method : buffer.readUInt8(16)
        }
    }
    static toBuffer({ ip_address, subnet_mask, default_gateway, dhcp_server, ip_assigment_method }) {
        return Buffer.concat([
            Buffer.from(ip_address.split('.')),
            Buffer.from(subnet_mask.split('.')),
            Buffer.from(default_gateway.split('.')),
            Buffer.from(dhcp_server.split('.')),
            Buffer.from([ ip_assigment_method, 0x00 ])
        ])
    }
    static KNX_ATTRIBUTES = ['ip_address', 'subnet_mask', 'default_gateway', 'dhcp_server', 'ip_assigment_method'];
}

module.exports = DIBBody__IP_CUR_CONFIG;
