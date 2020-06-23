const { Buffer } = require('buffer');
const BaseKNXStructure = require('../../../BaseKNXStructure');
const {
    CONNECTION_TYPES: { REMCONF_CONNECTION }
} = require('../../../constants');

class CRIBody__REMCONF_CONNECTION extends BaseKNXStructure {
    constructor(data) {
        super(data);
        this.connection_type = REMCONF_CONNECTION;
    }
    static fromBuffer(buffer) {
        return { buffer }
    }
    static toBuffer({ buffer }) {
        return buffer;
    }
    static KNX_ATTRIBUTES = ['buffer'];
}

module.exports = CRIBody__REMCONF_CONNECTION;
