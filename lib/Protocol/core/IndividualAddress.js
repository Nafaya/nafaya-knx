const { Buffer } = require('buffer');
const _ = require('underscore');
const BaseKNXStructure = require('../BaseKNXStructure');

class IndividualAddress extends BaseKNXStructure {
    constructor(data) {
        super(data);
    }
    update(data) {
        if (typeof data === 'string') {
            const parsed = data.split('.');
            if (parsed.length === 1) {
                data = parseInt(data);
            } else if (parsed.length === 3) {
                data = {
                    area   : parseInt(parsed[2])&0xF,
                    line   : parseInt(parsed[1])&0xF,
                    device : parseInt(parsed[0])&0xFF
                };
            } else throw new Error(`Wrong individual address format(${data})`);
        }
        if(typeof data === 'number') {
            data = {
                area   : (data >> 12)&0xF,
                line   : (data >> 8)&0xF,
                device : data&0xFF
            };
        }
        super.update(data);
    }
    static fromBuffer(buffer) {
        const subnetwork = buffer.readUInt8(0);

        return {
            area   : (subnetwork >> 4)&0xF,
            line   : subnetwork&0xF,
            device : buffer.readUInt8(1)
        };
    }
    static toBuffer({ area, line, device }) {
        return Buffer.from([ area << 4 | line, device ]);
    }
    static KNX_ATTRIBUTES = ['area', 'line', 'device'];
}

module.exports = IndividualAddress;
