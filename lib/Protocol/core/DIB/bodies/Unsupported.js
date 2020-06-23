const BaseKNXStructure = require('../../../BaseKNXStructure');

class DIBBody__Unsupported extends BaseKNXStructure {
    constructor(data) {
        super(data);
        this.description_type_code = null;
    }
    static fromBuffer(buffer) {
        return { buffer }
    }
    static toBuffer({ buffer }) {
        return buffer;
    }
    static KNX_ATTRIBUTES = ['buffer'];
}

module.exports = DIBBody__Unsupported;
