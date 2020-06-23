const { Buffer } = require('buffer');
const BaseKNXStructure = require('../../../BaseKNXStructure');
const {
    SELECTOR_TYPE_CODES: { PRGMODE }
} = require('../../../constants');

class CRIBody__MAC extends BaseKNXStructure {
    constructor(data) {
        super(data);
        this.connection_type = PRGMODE;
    }
    static fromBuffer() {
        return {}
    }
    static toBuffer({}) {
        return Buffer.from([]);
    }
    static KNX_ATTRIBUTES = [];
}

module.exports = CRIBody__MAC;
