/*
KNXnet/IP DISCONNECT_REQUEST Frame body
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Communication Channel ID      | reserved                      |
|                               |                               |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| HPAI                                                          |
| Control endpoint                                              |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
*/

const { Buffer } = require('buffer');
const BaseKNXStructure = require('../BaseKNXStructure');
const {
    KNXNETIP_SERVICE_TYPES : { DISCONNECT_REQUEST }
} = rrequire('../../constants');
const HPAI = require('../../core/HPAI');

class FrameBody__DISCONNECT_REQUEST extends BaseKNXStructure {
    constructor(data) {
        if (!(data instanceof Buffer)) {
            if (!(data.control_endpoint instanceof HPAI)) data.control_endpoint = HPAI.from(data.control_endpoint);
        }
        super(data);
        this.service_type = DISCONNECT_REQUEST;
    }
    static fromBuffer(buffer) {
        const channel_id  = buffer.readUInt8(0);
        const control_endpoint  = new HPAI(buffer.slice(2));

        return {
            channel_id,
            control_endpoint
        }
    }
    static toBuffer({ channel_id, control_endpoint }) {
        return Buffer.concat([
            Buffer.from([channel_id, 0]),
            control_endpoint.toBuffer()
        ]);
    }
    static KNX_ATTRIBUTES = ['channel_id', 'control_endpoint'];
}

module.exports = FrameBody__DISCONNECT_REQUEST;