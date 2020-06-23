/*
KNXnet/IP TUNNELLING_REQUEST frame body
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Structure Length              | Communication Channel ID      |
| (1 octet)                     | (1 octet)                     |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
| Sequence Counter              | reserved                      |
| (1 octet)                     | (1 octet)                     |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
cEMI frame
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Message Code                  | Additional Info Length        |
| (1 octet = 08h)               | (1 octet)                     |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
| Additional Information                                        |
| (optional, variable length)                                   |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
| Service Information                                           |
| (variable length)                                             |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
*/

const { Buffer } = require('buffer');
const BaseKNXStructure = require('../BaseKNXStructure');
const {
    KNXNETIP_SERVICE_TYPES : { TUNNELLING_REQUEST }
} = require('../../constants');
const cEMI = require('../../core/cEMI');

class FrameBody__TUNNELLING_REQUEST extends BaseKNXStructure {
    constructor(data) {
        if (!(data instanceof Buffer)) {
            if (!(data.cemi instanceof cEMI)) data.cemi = cEMI.from(data.cemi);
        }
        super(data);
        this.service_type = TUNNELLING_REQUEST;
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

module.exports = FrameBody__TUNNELLING_REQUEST;
