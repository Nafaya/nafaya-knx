/*
KNXnet/IP ROUTING_INDICATION frame body
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Structure Length              | DeviceState                   |
| (1 octet)                     | (1 octet)                     |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| ROUTING_BUSY_WAIT_TIME (in milliseconds)                      |
| (2 octets)                                                    |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
| ROUTING_BUSY_CONTROL_FIELD                                    |
| (2 octets)                                                    |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
*/

const { Buffer } = require('buffer');
const BaseKNXStructure = require('../BaseKNXStructure');
const {
    KNXNETIP_SERVICE_TYPES : { ROUTING_BUSY }
} = require('../../constants');
const STRUCTURE_LENGTH = 6;

class FrameBody__ROUTING_BUSY extends BaseKNXStructure {
    constructor(data) {
        super(data);
        this.service_type = ROUTING_BUSY;
    }
    static fromBuffer(buffer) {
        const structure_length = buffer.readUInt8(0);
        if (STRUCTURE_LENGTH !== structure_length) throw new Error(`Unsupported ROUTING_LOST_MESSAGE frame body length(Receive: ${structure_length}, Expected: ${STRUCTURE_LENGTH}).`);

        return {
            device_state  : buffer.readUInt8(1),
            wait_time     : buffer.readUInt16BE(2),
            control_field : buffer.readUInt16BE(4)
        }
    }
    static toBuffer({ device_state, wait_time, control_field }) {
        const buffer = Buffer.alloc(STRUCTURE_LENGTH);

        buffer.writeUInt8(STRUCTURE_LENGTH, 0);
        buffer.writeUInt8(device_state, 1);
        buffer.writeUInt16BE(wait_time, 2);
        buffer.writeUInt16BE(control_field, 4);

        return buffer;
    }
    static KNX_ATTRIBUTES = ['device_state', 'wait_time', 'control_field'];
}

module.exports = FrameBody__ROUTING_BUSY;
