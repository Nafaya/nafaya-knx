/*
KNX frame header structure
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| HEADER_SIZE_10                | KNXNETIP_VERSION              |
| (06h)                         | (10h)                         |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| KNXNETIP_SERVICE_TYPE                                         |
| (2 octets)                                                    |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| HEADER_SIZE_10 + sizeof(message body)                         |
| (2 octets)                                                    |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
*/

const { Buffer } = require('buffer');
const _ = require('underscore');
const BaseKNXStructure = require('../../BaseKNXStructure');
const {
    HEADER_SIZE_10,
    KNXNETIP_VERSION,
    KNXNETIP_SERVICE_TYPES
} = require('../../constants')

class FrameHeader extends BaseKNXStructure {
    constructor(data) {
        if (typeof data === 'number') data = { service_type: data };

        super(data)
        _.defaults(this, {
            knxnetip_version : KNXNETIP_VERSION
        });
    }
    static fromBuffer(buffer) {
        const structure_length = buffer.readUInt8(0);
        if (structure_length !== HEADER_SIZE_10) throw new Error(`Unsupported header length(Receive: ${structure_length}, Expected: ${HEADER_SIZE_10}).`);

        const data = {
            structure_length,
            knxnetip_version : buffer.readUInt8(1),
            service_type     : buffer.readUInt16BE(2),
            total_length     : buffer.readUInt16BE(4)
        }
        if (data.knxnetip_version !== KNXNETIP_VERSION) console.warn(`Unexpected KNXNETIP_VERSION(Receive: ${data.knxnetip_version}, Expected: ${KNXNETIP_VERSION})`);
        if (!(data.service_type in KNXNETIP_SERVICE_TYPES)) console.warn(`Unsupported SERVICE_TYPE(Receive: ${data.service_type})`);

        return data;
    }
    static toBuffer({ structure_length, knxnetip_version, service_type, total_length}) {
        if (knxnetip_version !== KNXNETIP_VERSION) console.warn(`Unexpected KNXNETIP_VERSION(Receive: ${knxnetip_version}, Expected: ${KNXNETIP_VERSION})`);
        if (!(service_type in KNXNETIP_SERVICE_TYPES)) console.warn(`Unsupported SERVICE_TYPE(Receive: ${service_type})`);

        const buffer = Buffer.alloc(HEADER_SIZE_10);
        buffer.writeUInt8(HEADER_SIZE_10, 0);
        buffer.writeUInt8(knxnetip_version, 1);
        buffer.writeUInt16BE(service_type, 2);
        buffer.writeUInt16BE(total_length, 4);
    }
    static KNX_ATTRIBUTES = ['structure_length', 'knxnetip_version', 'service_type', 'total_length'];
}

module.exports = FrameHeader;
