const { Buffer } = require('buffer');
const BaseKNXStructure = require('../../BaseKNXStructure');
const FrameHeader = require('./header');
const {
    KNXNETIP_SERVICE_TYPES
} = require('../../constants');
function getFrameBodyClass(service_type){
    return require(`./bodies/${KNXNETIP_SERVICE_TYPES[service_type] || 'Unsupported'}`);
}

class Frame extends BaseKNXStructure {
    constructor(data) {
        if (!(data instanceof Buffer)) {
            if (!(data.header instanceof FrameHeader)) data.header = FrameHeader.from(data.header);
        }
        super(data);
    }
    update(data) {
        if (data.header) super.update({ header : data.header });
        if (!this.body || this.header.service_type !== this.body.service_type) this.body = getFrameBodyClass(this.header.service_type).from(data.body);
        else if (data.body) super.update({ body : data.body });
    }
    static fromBuffer(buffer) {
        const header = FrameHeader.from(buffer);
        const body = getFrameBodyClass(header.service_type).from(buffer.readUInt8(header.structure_length));

        return {
            header,
            body
        }
    }
    static toBuffer({ header, body }) {
        header.update({ total_length: header.structure_length + body.toBuffer().length });
        return Buffer.concat([header.toBuffer(), body.toBuffer()]);
    }
    static KNX_ATTRIBUTES = ['header', 'body'];
}

module.exports = Frame;
