/*
KNXnet/IP SEARCH_REQUEST frame body
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| HPAI                                                          |
| Discovery endpoint                                            |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
*/

const { Buffer } = require('buffer');
const _ = require('underscore');
const BaseKNXStructure = require('../BaseKNXStructure');
const {
    KNXNETIP_SERVICE_TYPES : { SEARCH_REQUEST }
} = rrequire('../../constants');
const HPAI = require('../../core/HPAI');

class FrameBody__SEARCH_REQUEST extends BaseKNXStructure {
    constructor(data) {
        if (!(data instanceof Buffer)) {
            if (!(data.discovery_endpoint instanceof HPAI)) data.discovery_endpoint = HPAI.from(data.discovery_endpoint);
        }
        super(data);
        this.service_type = SEARCH_REQUEST;
    }
    static fromBuffer(buffer) {
        return {
            discovery_endpoint : new HPAI(buffer)
        }
    }
    static toBuffer({ discovery_endpoint }) {
        return discovery_endpoint.toBuffer();
    }
    static KNX_ATTRIBUTES = ['discovery_endpoint'];
}

module.exports = FrameBody__SEARCH_REQUEST;
