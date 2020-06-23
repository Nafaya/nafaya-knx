/*
KNXnet/IP DESCRIPTION_RESPONSE frame body
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| DIB                                                           |
| device hardware                                               |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
| DIB                                                           |
| supported service families                                    |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
| DIB                                                           |
| other device information (optional)                           |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
*/

const { Buffer } = require('buffer');
const _ = require('underscore');
const BaseKNXStructure = require('../BaseKNXStructure');
const {
    KNXNETIP_SERVICE_TYPES : { DESCRIPTION_RESPONSE }
} = require('../../constants');
const DIB = require('../../core/DIB');

class FrameBody__SEARCH_RESPONSE extends BaseKNXStructure {
    constructor(data) {
        if (!(data instanceof Buffer)) {
            if (!(data.device_info instanceof DIB)) data.device_info = DIB.from(data.device_info);
            if (!(data.supported_service_families instanceof DIB)) data.supported_service_families = DIB.from(data.supported_service_families);
            if (data.additional_dibs) data.additional_dibs = data.additional_dibs.map((dib) => {
                return (dib instanceof DIB) ? dib : DIB.from(dib);
            });
        }
        super(data);
        this.service_type = DESCRIPTION_RESPONSE;
    }
    static fromBuffer(buffer) {
        const device_info = DIB.from(buffer);
        const supported_service_families = DIB.from(buffer.slice(device_info.header.structure_length));
        let buffer_shift = device_info.header.structure_length + supported_service_families.header.structure_length;
        const additional_dibs = [];
        while (buffer_shift < buffer.length) {
            const dib = DIB.from(buffer.slice(buffer_shift));
            additional_dibs.push(dib);
            buffer_shift += dib.header.structure_length;
        }

        return {
            device_info,
            supported_service_families,
            additional_dibs
        }
    }
    static toBuffer({ device_info, supported_service_families, additional_dibs }) {
        return Buffer.concat([
            device_info.toBuffer(),
            supported_service_families.toBuffer(),
            ... additional_dibs.map(v => v.toBuffer())
        ]);
    }
    static KNX_ATTRIBUTES = ['device_info', 'supported_service_families', 'additional_dibs'];
}

module.exports = FrameBody__SEARCH_RESPONSE;
