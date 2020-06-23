/*
KNXnet/IP REMOTE_DIAGNOSTIC_REQUEST frame body
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| HPAI                                                          |
| Discovery endpoint                                            |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
| SELECTOR                                                      |
|                                                               |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
*/

const { Buffer } = require('buffer');
const BaseKNXStructure = require('../BaseKNXStructure');
const {
    KNXNETIP_SERVICE_TYPES : { REMOTE_DIAGNOSTIC_REQUEST }
} = require('../../constants');
const HPAI = require('../../core/HPAI');
const SELECTOR = require('../../core/SELECTOR');

class FrameBody__REMOTE_DIAGNOSTIC_REQUEST extends BaseKNXStructure {
    constructor(data) {
        if (!(data instanceof Buffer)) {
            if (!(data.discovery_endpoint instanceof HPAI)) data.discovery_endpoint = HPAI.from(data.discovery_endpoint);
            if (!(data.selector instanceof SELECTOR)) data.selector = SELECTOR.from(data.selector);
        }
        super(data);
        this.service_type = REMOTE_DIAGNOSTIC_REQUEST;
    }
    static fromBuffer(buffer) {
        const discovery_endpoint = HPAI.from(buffer);
        const selector = SELECTOR.from(buffer.slice(discovery_endpoint.structure_length));

        return {
            discovery_endpoint,
            selector
        }
    }
    static toBuffer({ discovery_endpoint, selector }) {
        return Buffer.concat([
            discovery_endpoint.toBuffer(),
            selector.toBuffer()
        ]);
    }
    static KNX_ATTRIBUTES = ['discovery_endpoint', 'selector'];
}

module.exports = FrameBody__REMOTE_DIAGNOSTIC_REQUEST;
