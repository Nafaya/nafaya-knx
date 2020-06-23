const { Buffer } = require('buffer');
const BaseKNXStructure = require('../../../BaseKNXStructure');
const {
    CONNECTION_TYPES: { DEVICE_MGMT_CONNECTION }
} = require('../../../constants');

class CRDBody__DEVICE_MGMT_CONNECTION extends BaseKNXStructure {
    constructor(data) {
        super(data);
        this.connection_type = DEVICE_MGMT_CONNECTION;
    }
    static fromBuffer() {
        return {}
    }
    static toBuffer({}) {
        return Buffer.from([]);
    }
    static KNX_ATTRIBUTES = [];
}

module.exports = CRDBody__DEVICE_MGMT_CONNECTION;
