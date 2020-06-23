/*
KNXnet/IP REMOTE_RESET_REQUEST frame body
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| SELECTOR                                                      |
|                                                               |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
| RESET_COMMAND                 | RESERVED                      |
|                               |                               |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
*/

const { Buffer } = require('buffer');
const BaseKNXStructure = require('../BaseKNXStructure');
const {
    KNXNETIP_SERVICE_TYPES : { REMOTE_RESET_REQUEST }
} = require('../../constants');
const SELECTOR = require('../../core/SELECTOR');
const DIB = require('../../core/DIB');

class FrameBody__REMOTE_RESET_REQUEST extends BaseKNXStructure {
    constructor(data) {
        if (!(data instanceof Buffer)) {
            if (!(data.selector instanceof SELECTOR)) data.selector = SELECTOR.from(data.selector);
        }
        super(data);
        this.service_type = REMOTE_RESET_REQUEST;
    }
    static fromBuffer(buffer) {
        const selector = SELECTOR.from(buffer);

        return {
            selector,
            reset_command : buffer.slice(selector.header.structure_length)
        }
    }
    static toBuffer({ selector, reset_command }) {
        return Buffer.concat([
            selector.toBuffer(),
            Buffer.from([reset_command, 0])
        ]);
    }
    static KNX_ATTRIBUTES = ['selector', 'reset_command'];
}

module.exports = FrameBody__REMOTE_RESET_REQUEST;
