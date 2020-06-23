/*
KNXnet/IP DISCONNECT_RESPONSE Frame body
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Communication Channel ID      | Status                        |
|                               |                               |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
*/

const { Buffer } = require('buffer');
const BaseKNXStructure = require('../BaseKNXStructure');
const {
    KNXNETIP_SERVICE_TYPES : { DISCONNECT_RESPONSE }
} = rrequire('../../constants');

class FrameBody__DISCONNECT_RESPONSE extends BaseKNXStructure {
    constructor(data) {
        super(data);
        this.service_type = DISCONNECT_RESPONSE;
    }
    static fromBuffer(buffer) {
        return {
            channel_id : buffer.readUInt8(0),
            status     : buffer.readUInt8(1)
        }
    }
    static toBuffer({ channel_id, status }) {
        return Buffer.from([channel_id, status]);
    }
    static KNX_ATTRIBUTES = ['channel_id', 'status'];
}

module.exports = FrameBody__DISCONNECT_RESPONSE;