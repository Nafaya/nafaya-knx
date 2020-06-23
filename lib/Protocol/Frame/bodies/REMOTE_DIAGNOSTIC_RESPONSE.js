/*
KNXnet/IP REMOTE_DIAGNOSTIC_RESPONSE frame body
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| SELECTOR                                                      |
|                                                               |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
| DIB                                                           |
| ???                                                           |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
| DIB (optional)                                                |
| ???                                                           |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
| ...                                                           |
|                                                               |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
*/

const { Buffer } = require('buffer');
const BaseKNXStructure = require('../BaseKNXStructure');
const {
    KNXNETIP_SERVICE_TYPES : { REMOTE_DIAGNOSTIC_RESPONSE }
} = require('../../constants');
const SELECTOR = require('../../core/SELECTOR');
const DIB = require('../../core/DIB');

class FrameBody__REMOTE_DIAGNOSTIC_RESPONSE extends BaseKNXStructure {
    constructor(data) {
        if (!(data instanceof Buffer)) {
            if (!(data.selector instanceof SELECTOR)) data.selector = SELECTOR.from(data.selector);
            if (data.dibs) data.dibs = data.dibs.map((dib) => {
                return (dib instanceof DIB) ? dib : DIB.from(dib);
            });
        }
        super(data);
        this.service_type = REMOTE_DIAGNOSTIC_RESPONSE;
    }
    static fromBuffer(buffer) {
        const selector = SELECTOR.from(buffer);
        let buffer_shift = selector.header.structure_length;
        const dibs = [];
        while (buffer_shift < buffer.length) {
            const dib = DIB.from(buffer.slice(buffer_shift));
            dibs.push(dib);
            buffer_shift += dib.header.structure_length;
        }
        return {
            selector,
            dibs
        }
    }
    static toBuffer({ selector, dibs }) {
        return Buffer.concat([
            selector.toBuffer(),
            ... dibs.map(v => v.toBuffer())
        ]);
    }
    static KNX_ATTRIBUTES = ['selector', 'dibs'];
}

module.exports = FrameBody__REMOTE_DIAGNOSTIC_RESPONSE;
