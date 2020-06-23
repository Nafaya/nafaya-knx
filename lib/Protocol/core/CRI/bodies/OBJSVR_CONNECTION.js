const { Buffer } = require('buffer');
const BaseKNXStructure = require('../../../BaseKNXStructure');
const {
    CONNECTION_TYPES: { OBJSVR_CONNECTION }
} = require('../../../constants');

class CRIBody__OBJSVR_CONNECTION extends BaseKNXStructure {
    constructor(data) {
        super(data);
        this.connection_type = OBJSVR_CONNECTION;
    }
    static fromBuffer(buffer) {
        return { buffer }
    }
    static toBuffer({ buffer }) {
        return buffer;
    }
    static KNX_ATTRIBUTES = ['buffer'];
}

module.exports = CRIBody__OBJSVR_CONNECTION;
