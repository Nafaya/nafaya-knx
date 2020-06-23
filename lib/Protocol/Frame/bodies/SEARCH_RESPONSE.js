/*
KNXnet/IP SEARCH_RESPONSE frame body
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| HPAI                                                          |
| Control endpoint                                              |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
| DIB                                                           |
| device hardware                                               |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
| DIB                                                           |
| supported service families                                    |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
*/

const { Buffer } = require('buffer');
const _ = require('underscore');
const BaseKNXStructure = require('../BaseKNXStructure');
const {
    KNXNETIP_SERVICE_TYPES : { SEARCH_RESPONSE }
} = require('../../constants');
const HPAI = require('../../core/HPAI');
const DIB = require('../../core/DIB');

class FrameBody__SEARCH_RESPONSE extends BaseKNXStructure {
    constructor(data) {
        if (!(data instanceof Buffer)) {
            if (!(data.control_endpoint instanceof HPAI)) data.control_endpoint = HPAI.from(data.control_endpoint);
            if (!(data.device_info instanceof DIB)) data.device_info = DIB.from(data.device_info);
            if (!(data.supported_service_families instanceof DIB)) data.supported_service_families = DIB.from(data.supported_service_families);
        }
        super(data);
        this.service_type = SEARCH_RESPONSE;
    }
    static fromBuffer(buffer) {
        const control_endpoint = HPAI.from(buffer);
        const device_info = DIB.from(buffer.slice(control_endpoint.structure_length));
        const supported_service_families = DIB.from(buffer.slice(control_endpoint.structure_length + device_info.header.structure_length));

        return {
            control_endpoint,
            device_info,
            supported_service_families
        }
    }
    static toBuffer({ control_endpoint, device_info, supported_service_families }) {
        return Buffer.concat([
            control_endpoint.toBuffer(),
            device_info.toBuffer(),
            supported_service_families.toBuffer()
        ]);
    }
    static KNX_ATTRIBUTES = ['control_endpoint', 'device_info', 'supported_service_families'];
}

module.exports = FrameBody__SEARCH_RESPONSE;
