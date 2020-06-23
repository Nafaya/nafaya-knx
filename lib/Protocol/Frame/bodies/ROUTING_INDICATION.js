/*
KNXnet/IP ROUTING_INDICATION frame body
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| cEMI Frame                                                    |
| (variable length)                                             |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
*/

const { Buffer } = require('buffer');
const BaseKNXStructure = require('../BaseKNXStructure');
const {
    KNXNETIP_SERVICE_TYPES : { ROUTING_INDICATION }
} = require('../../constants');
const cEMI = require('../../core/cEMI');

class FrameBody__ROUTING_INDICATION extends BaseKNXStructure {
    constructor(data) {
        if (!(data instanceof Buffer)) {
            if (!(data.cemi instanceof cEMI)) data.cemi = cEMI.from(data.cemi);
        }
        super(data);
        this.service_type = ROUTING_INDICATION;
    }
    static fromBuffer(buffer) {
        return {
            cemi : cEMI.from(buffer)
        }
    }
    static toBuffer({ cemi }) {
        return cemi.toBuffer();
    }
    static KNX_ATTRIBUTES = ['cemi'];
}

module.exports = FrameBody__ROUTING_INDICATION;
