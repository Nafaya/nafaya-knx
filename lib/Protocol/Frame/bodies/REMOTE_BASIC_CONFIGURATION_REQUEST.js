/*
KNXnet/IP REMOTE_BASIC_CONFIGURATION_REQUEST frame body
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| HPAI                                                          |
| Discovery endpoint                                            |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
| SELECTOR                                                      |
|                                                               |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
| DIB                                                           |
| ???                                                           |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
| DIB (optional)                                                |
| ???                                                           |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
*/

const { Buffer } = require('buffer');
const BaseKNXStructure = require('../BaseKNXStructure');
const {
    KNXNETIP_SERVICE_TYPES : { REMOTE_BASIC_CONFIGURATION_REQUEST }
} = require('../../constants');
const HPAI = require('../../core/HPAI');
const SELECTOR = require('../../core/SELECTOR');
const DIB = require('../../core/DIB');

class FrameBody__REMOTE_BASIC_CONFIGURATION_REQUEST extends BaseKNXStructure {
    constructor(data) {
        if (!(data instanceof Buffer)) {
            if (!(data.discovery_endpoint  instanceof HPAI)) data.discovery_endpoint = HPAI.from(data.discovery_endpoint);
            if (!(data.selector instanceof SELECTOR)) data.selector = SELECTOR.from(data.selector);
            if (data.dibs) data.dibs = data.dibs.map((dib) => {
                return (dib instanceof DIB) ? dib : DIB.from(dib);
            });
        }
        super(data);
        this.service_type = REMOTE_BASIC_CONFIGURATION_REQUEST;
    }
    static fromBuffer(buffer) {
        const discovery_endpoint = HPAI.from(buffer);
        const selector = SELECTOR.from(buffer.slice(discovery_endpoint.structure_length));

        let buffer_shift = discovery_endpoint.structure_length + selector.header.structure_length;
        const dibs = [];
        while (buffer_shift < buffer.length) {
            const dib = DIB.from(buffer.slice(buffer_shift));
            dibs.push(dib);
            buffer_shift += dib.header.structure_length;
        }

        return {
            discovery_endpoint,
            selector,
            dibs
        }
    }
    static toBuffer({ discovery_endpoint, selector, dibs, cemi }) {
        return Buffer.concat([
            discovery_endpoint.toBuffer(),
            selector.toBuffer(),
            ... dibs.map(v => v.toBuffer())
        ]);
    }
    static KNX_ATTRIBUTES = ['discovery_endpoint', 'selector', 'dibs'];
}

module.exports = FrameBody__REMOTE_BASIC_CONFIGURATION_REQUEST;
