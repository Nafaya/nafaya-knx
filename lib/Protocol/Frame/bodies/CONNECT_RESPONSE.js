/*
KNXnet/IP CONNECT_RESPONSE Frame body
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Communication Channel ID      | Status                        |
|                               |                               |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| HPAI                                                          |
| Data endpoint                                                 |
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| CRD                                                           |
| Connection Response Data Block                                |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
*/

const { Buffer } = require('buffer');
const BaseKNXStructure = require('../BaseKNXStructure');
const {
    KNXNETIP_SERVICE_TYPES : { CONNECT_RESPONSE }
} = rrequire('../../constants');
const HPAI = require('../../core/HPAI');
const CRD = require('../../core/CRD');

class FrameBody__CONNECT_RESPONSE extends BaseKNXStructure {
    constructor(data) {
        if (!(data instanceof Buffer)) {
            if (!(data.data_endpoint instanceof HPAI)) data.data_endpoint = HPAI.from(data.data_endpoint);
            if (!(data.crd instanceof CRD)) data.crd = CRD.from(data.crd);
        }
        super(data);
        this.service_type = CONNECT_RESPONSE;
    }
    static fromBuffer(buffer) {
        const channel_id  = buffer.readUInt8(0);
        const status      = buffer.readUInt8(1);
        const data_endpoint  = new HPAI(buffer.slice(2));
        const crd  = new CRD(buffer.slice(2 + data_endpoint.structure_length));

        return {
            channel_id,
            status,
            data_endpoint,
            crd
        }
    }
    static toBuffer({ channel_id, status, data_endpoint, crd }) {
        return Buffer.concat([
            Buffer.from([ channel_id, status ]),
            data_endpoint.toBuffer(),
            crd.toBuffer()
        ]);
    }
    static KNX_ATTRIBUTES = ['channel_id', 'status', 'data_endpoint', 'crd'];
}

module.exports = FrameBody__CONNECT_RESPONSE;
