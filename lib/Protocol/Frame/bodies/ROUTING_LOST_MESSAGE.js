/*
KNXnet/IP ROUTING_LOST_MESSAGE frame body
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| cEMI Frame                                                    |
| (variable length)                                             |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
*/

const { Buffer } = require('buffer');
const BaseKNXStructure = require('../BaseKNXStructure');
const {
    KNXNETIP_SERVICE_TYPES : { ROUTING_LOST_MESSAGE }
} = require('../../constants');
const STRUCTURE_LENGTH = 4;
class FrameBody__ROUTING_LOST_MESSAGE extends BaseKNXStructure {
    constructor(data) {
        super(data);
        this.service_type = ROUTING_LOST_MESSAGE;
    }
    static fromBuffer(buffer) {
        const structure_length = buffer.readUInt8(0);
        if (STRUCTURE_LENGTH !== structure_length) throw new Error(`Unsupported ROUTING_LOST_MESSAGE frame body length(Receive: ${structure_length}, Expected: ${STRUCTURE_LENGTH}).`);

        return {
            device_state            : buffer.readUInt8(1),
            number_of_lost_messages : buffer.readUInt16BE(2)
        }
    }
    static toBuffer({ device_state, number_of_lost_messages }) {
        const buffer = Buffer.alloc(STRUCTURE_LENGTH);

        buffer.writeUInt8(STRUCTURE_LENGTH, 0);
        buffer.writeUInt8(device_state, 1);
        buffer.writeUInt16BE(number_of_lost_messages, 2);

        return buffer;
    }
    static KNX_ATTRIBUTES = ['device_state', 'number_of_lost_messages'];
}

module.exports = FrameBody__ROUTING_LOST_MESSAGE;
