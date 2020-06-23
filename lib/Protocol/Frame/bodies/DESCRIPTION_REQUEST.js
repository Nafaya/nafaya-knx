/*
KNXnet/IP DESCRIPTION_REQUEST frame body
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| HPAI                                                          |
| Control endpoint                                              |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
*/

const { Buffer } = require('buffer');
const BaseKNXStructure = require('../BaseKNXStructure');
const {
    KNXNETIP_SERVICE_TYPES : { DESCRIPTION_REQUEST }
} = require('../../constants');
const HPAI = require('../../core/HPAI');

class FrameBody__DESCRIPTION_REQUEST extends BaseKNXStructure {
    constructor(data) {
        if (!(data instanceof Buffer)) {
            if (!(data.control_endpoint instanceof HPAI)) data.control_endpoint = HPAI.from(data.control_endpoint);
        }
        super(data);
        this.service_type = DESCRIPTION_REQUEST;
    }
    static fromBuffer(buffer) {
        return {
            control_endpoint : new HPAI(buffer)
        }
    }
    static toBuffer({ control_endpoint }) {
        return control_endpoint.toBuffer();
    }
    static KNX_ATTRIBUTES = ['control_endpoint'];
}

module.exports = FrameBody__DESCRIPTION_REQUEST;
