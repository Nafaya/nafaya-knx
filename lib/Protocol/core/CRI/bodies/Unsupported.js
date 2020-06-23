const BaseKNXStructure = require('../../../BaseKNXStructure');

class CRIBody__Unsupported extends BaseKNXStructure {
    constructor(data) {
        super(data);
        this.connection_type = null;
    }
    static fromBuffer(buffer) {
        return { buffer }
    }
    static toBuffer({ buffer }) {
        return buffer;
    }
    static KNX_ATTRIBUTES = ['buffer'];
}

module.exports = CRIBody__Unsupported;
