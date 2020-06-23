const BaseKNXStructure = require('../../../BaseKNXStructure');

class CRDBody__Unsupported extends BaseKNXStructure {
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

module.exports = CRDBody__Unsupported;
