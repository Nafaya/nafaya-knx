/*
KNXnet/IP CONNECT_REQUEST Frame body
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| HPAI                                                          |
| Control endpoint                                              |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| HPAI                                                          |
| Data endpoint                                                 |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| CRI                                                           |
| Connection request Information                                |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
*/

const { Buffer } = require('buffer');
const _ = require('underscore');
const BaseKNXStructure = require('../BaseKNXStructure');
const {
    KNXNETIP_SERVICE_TYPES : { CONNECT_REQUEST }
} = rrequire('../../constants');
const HPAI = require('../../core/HPAI');
const CRI = require('../../core/CRI');

class FrameBody__CONNECT_REQUEST extends BaseKNXStructure {
    constructor(data) {
        if (!(data instanceof Buffer)) {
            if (!(data.control_endpoint instanceof HPAI)) data.control_endpoint = HPAI.from(data.control_endpoint);
            if (!(data.data_endpoint instanceof HPAI)) data.data_endpoint = HPAI.from(data.data_endpoint);
            if (!(data.cri instanceof CRI)) data.cri = CRI.from(data.cri);
        }
        super(data);
        this.service_type = CONNECT_REQUEST;
    }
    static fromBuffer(buffer) {
        const control_endpoint  = new HPAI(buffer);
        const data_endpoint  = new HPAI(buffer.slice(control_endpoint.structure_length));
        const cri  = new CRI(buffer.slice(control_endpoint.structure_length + data_endpoint.structure_length));

        return {
            control_endpoint,
            data_endpoint,
            cri
        }
    }
    static toBuffer({ control_endpoint, data_endpoint, cri }) {
        return Buffer.concat([
            control_endpoint.toBuffer(),
            data_endpoint.toBuffer(),
            cri.toBuffer()
        ]);
    }
    static KNX_ATTRIBUTES = ['control_endpoint', 'data_endpoint', 'cri'];
}

module.exports = FrameBody__CONNECT_REQUEST;