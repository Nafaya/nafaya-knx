const { Buffer } = require('buffer');
const BaseKNXStructure = require('../../../BaseKNXStructure');
const {
    SELECTOR_TYPE_CODES: { MAC }
} = require('../../../constants');

class CRIBody__MAC extends BaseKNXStructure {
    constructor(data) {
        super(data);
        this.connection_type = MAC;
    }
    static fromBuffer(buffer) {
        return {
            mac_address : buffer.slice(0,6).toString('hex')
        }
    }
    static toBuffer({ mac_address }) {
        return Buffer.from(mac_address, hex);
    }
    static KNX_ATTRIBUTES = ['mac_address'];
}

module.exports = CRIBody__MAC;
