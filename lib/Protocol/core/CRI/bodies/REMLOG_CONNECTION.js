const { Buffer } = require('buffer');
const BaseKNXStructure = require('../../../BaseKNXStructure');
const {
    CONNECTION_TYPES: { REMLOG_CONNECTION }
} = require('../../../constants');

class CRIBody__REMLOG_CONNECTION extends BaseKNXStructure {
    constructor(data) {
        super(data);
        this.connection_type = REMLOG_CONNECTION;
    }
    static fromBuffer(buffer) {
        return { buffer }
    }
    static toBuffer({ buffer }) {
        return buffer;
    }
    static KNX_ATTRIBUTES = ['buffer'];
}

module.exports = CRIBody__REMLOG_CONNECTION;
