/*
KNXnet/IP DEVICE_CONFIGURATION_REQUEST frame body
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Structure Length              | Communication Channel ID      |
| (1 Octet)                     | (1 Octet)                     |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
| Sequence Counter              | reserved                      |
| (1 Octet)                     | (1 Octet)                     |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
cEMI frame
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Message Code                  | Service Information           |
| (1 Octet)                     | (variable length)             |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
*/

const { Buffer } = require('buffer');
const BaseKNXStructure = require('../BaseKNXStructure');
const {
    KNXNETIP_SERVICE_TYPES : { DEVICE_CONFIGURATION_REQUEST }
} = require('../../constants');
const cEMI = require('../../core/cEMI');

class FrameBody__DEVICE_CONFIGURATION_REQUEST extends BaseKNXStructure {
    constructor(data) {
        if (!(data instanceof Buffer)) {
            if (!(data.cemi instanceof cEMI)) data.cemi = cEMI.from(data.cemi);
        }
        super(data);
        this.service_type = DEVICE_CONFIGURATION_REQUEST;
    }
    static fromBuffer(buffer) {
        return {
            structure_length : buffer.readUInt8(0),
            channel_id       : buffer.readUInt8(1),
            sequence_counter : buffer.readUInt8(2),
            cemi             : cEMI.from(buffer.slice(4))
        }
    }
    static toBuffer({ structure_length, channel_id, sequence_counter, cemi }) {
        return Buffer.concat([
            Buffer.from([structure_length, channel_id, sequence_counter, 0]),
            cemi.toBuffer()
        ]);
    }
    static KNX_ATTRIBUTES = ['structure_length', 'channel_id', 'sequence_counter', 'cemi'];
}

module.exports = FrameBody__DEVICE_CONFIGURATION_REQUEST;
