const { Buffer } = require('buffer');
const _ = require('underscore');
const BaseKNXStructure = require('../BaseKNXStructure');

class GroupAddress extends BaseKNXStructure {
    constructor(data) {
        super(data);
    }
    update(data) {
        if (typeof data === 'string') {
            const parsed = data.split('/');
            if (parsed.length === 1) {
                data = parseInt(data);
            } else if (parsed.length === 2) {
                data = {
                    area   : parseInt(parsed[1] >> 3)&0x1F,
                    line   : parseInt(parsed[1])&0x7,
                    device : parseInt(parsed[0])&0xFF
                };
            } else if (parsed.length === 3) {
                data = {
                    area   : parseInt(parsed[2])&0x1F,
                    line   : parseInt(parsed[1])&0x7,
                    device : parseInt(parsed[0])&0xFF
                };
            } else throw new Error(`Wrong group address format(${data})`);
        }
        if (typeof data === 'number') {
            data = {
                area   : (data >> 11)&0x1F,
                line   : (data >> 8)&0x7,
                device : data&0xFF
            };
        }
        super.update(data);
    }
    static fromBuffer(buffer) {
        const mainmiddle = buffer.readUInt8(0);

        return {
            main   : (mainmiddle >> 3)&0x1F,
            middle : mainmiddle&0x7,
            sub    : buffer.readUInt8(1)
        };
    }
    static toBuffer({ main, middle, sub }) {
        return Buffer.from([ main << 3 | middle, sub ]);
    }
    static KNX_ATTRIBUTES = ['main', 'middle', 'sub'];
}

module.exports = GroupAddress;
