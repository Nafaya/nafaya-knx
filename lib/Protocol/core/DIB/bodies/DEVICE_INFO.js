/*
Device information DIB
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Structure Length              | Description Type Code         |
| (1 octet)                     | (1 octet)                     |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| KNX medium                    | Device Status                 |
| (1 Octet)                     | (1 Octet)                     |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| KNX Individual Address                                        |
| (2 Octets)                                                    |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Project-Installation identifier                               |
| (2 Octets)                                                    |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| KNXnet/IP device KNX Serial Number                            |
| (6 octets)                                                    |
+- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+
|                                                               |
|                                                               |
+- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+
|                                                               |
|                                                               |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| KNXnet/IP device routing multicast address                    |
| (4 octets)                                                    |
+- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+
|                                                               |
|                                                               |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| KNXnet/IP device MAC address                                  |
| (6 octets)                                                    |
+- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+
|                                                               |
|                                                               |
+- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+
|                                                               |
|                                                               |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Device Friendly Name                                          |
| (30 octets)                                                   |
+- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+
|                                                               |
....
|                                                               |
+- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+
|                                                               |
|                                                               |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
*/
const { Buffer } = require('buffer');
const BaseKNXStructure = require('../../../BaseKNXStructure');
const IndividualAddress = require('../../IndividualAddress');
const {
    KNX_MEDIUM_CODES,
    DESCRIPTION_TYPE_CODES: { DEVICE_INFO }
} = require('../../../constants');

class DIBBody__DEVICE_INFO extends BaseKNXStructure {
    constructor(data) {
        super(data);
        this.description_type_code = DEVICE_INFO;
    }
    static fromBuffer(buffer) {
        const project_installation_identifier = buffer.readUInt16BE(4);
        return {
            knx_medium : KNX_MEDIUM_CODES[buffer.readUInt8(0)] || 'reserved',
            device_status : { programming_mode: buffer.readUInt8(1)&0x01 },
            knx_individual_address : IndividualAddress.from(buffer.slice(2,4)),
            project_installation_identifier : {
                project_number      : (project_installation_identifier >> 4) & 0xFFF,
                installation_number : project_installation_identifier & 0xF
            },
            device_serial_number : buffer.slice(6,12).toString('hex'),
            device_routing_multicast_address : buffer.slice(12,16).join('.'),
            device_mac_address : buffer.slice(16,22).toString('hex'),
            device_friendly_name : buffer.slice(22).toString()
        }
    }
    static toBuffer({ knx_medium, device_status, knx_individual_address, project_installation_identifier,
                        device_serial_number, device_routing_multicast_address, device_mac_address, device_friendly_name }) {
        if (KNX_MEDIUM_CODES[knx_medium] === undefined) throw new Error(`Cannot convert knx_medium(${knx_medium})`);
        const buffer = Buffer.alloc(22);
        buffer.writeUInt8(KNX_MEDIUM_CODES[knx_medium], 0);
        buffer.writeUInt8(0xF&( (device_status.programming_mode & 0x01) ), 1);
        buffer.set(knx_individual_address.toBuffer(), 2);
        buffer.writeUInt16BE((project_installation_identifier.project_number << 4) | project_installation_identifier.installation_number, 4);
        buffer.set(Buffer.from(device_serial_number, 'hex'), 6);
        buffer.set(Buffer.from(device_routing_multicast_address.split('.')), 12);
        buffer.set(Buffer.from(device_mac_address, 'hex'), 16);
        buffer.set(Buffer.from(device_friendly_name), 22);
    }
    static KNX_ATTRIBUTES = ['knx_medium', 'device_status', 'knx_individual_address', 'project_installation_identifier',
        'device_serial_number', 'device_routing_multicast_address', 'device_mac_address', 'device_friendly_name'];
}

module.exports = DIBBody__DEVICE_INFO;
