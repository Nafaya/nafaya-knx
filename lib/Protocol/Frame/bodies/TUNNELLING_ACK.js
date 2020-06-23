/*
KNXnet/IP TUNNELLING_ACK frame body
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Structure Length              | Communication Channel ID      |
| (1 octet)                     | (1 octet)                     |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
| Sequence Counter              | Status                        |
| (1 octet)                     | (1 octet)                     |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
*/

const { Buffer } = require('buffer');
const BaseKNXStructure = require('../BaseKNXStructure');
const {
    KNXNETIP_SERVICE_TYPES : { TUNNELLING_ACK }
} = require('../../constants');

class FrameBody__TUNNELLING_ACK extends BaseKNXStructure {
    constructor(data) {
        super(data);
        this.service_type = TUNNELLING_ACK;
    }
    static fromBuffer(buffer) {
        return {
            structure_length : buffer.readUInt8(0),
            channel_id       : buffer.readUInt8(1),
            sequence_counter : buffer.readUInt8(2),
            status           : buffer.readUInt8(3)
        }
    }
    static toBuffer({ structure_length, channel_id, sequence_counter, status }) {
        return Buffer.from([structure_length, channel_id, sequence_counter, status]);
    }
    static KNX_ATTRIBUTES = ['structure_length', 'channel_id', 'sequence_counter', 'status'];
}

module.exports = FrameBody__TUNNELLING_ACK;
