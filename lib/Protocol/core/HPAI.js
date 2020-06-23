/*
KNX frame header structure
+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+-7-+-6-+-5-+-4-+-3-+-2-+-1-+-0-+
| Structure Length = 8          | Host Protocol Code            |
| (1 octet)                     | (1 octet)                     |
+-------------------------------+-------------------------------+
| IP Address                                                    |
| (4 octets)                                                    |
+-------------------------------+-------------------------------+
| IP port number                                                |
| (2 octets)                                                    |
+---------------------------------------------------------------+
UDP connection: Host Protocol Code = 0x01
TCP connection: Host Protocol Code = 0x02
*/

const { Buffer } = require('buffer');
const _ = require('underscore');
const BaseKNXStructure = require('../BaseKNXStructure');
const {
    HPAI_HOST_PROTOCOL_CODES
} = require('../constants')
const STRUCTURE_LENGTH = 8;

class HPAI extends BaseKNXStructure {
    constructor(data) {
        super(data);
        _.defaults(this, {
            structure_length   : STRUCTURE_LENGTH,
            host_protocol_code : HPAI_HOST_PROTOCOL_CODES.IPV4_UDP
        });
    }
    update(data) {
        if (typeof data === 'string') {
            const parsed = /^(?:(tcp|udp):\/\/)?(\d+\.\d+\.\d+\.\d+):(\d+)$/.exec(data);
            data = { ip: parsed[2], port: parsed[3] };
            if (parsed[1]) data.host_protocol_code = parsed[1] === 'tcp' ? HPAI_HOST_PROTOCOL_CODES.IPV4_TCP : HPAI_HOST_PROTOCOL_CODES.IPV4_UDP
        }
        super.update(data);
    }
    static fromBuffer(buffer) {
        const structure_length = buffer.readUInt8(0);
        if (structure_length !== STRUCTURE_LENGTH) throw new Error(`Unsupported hpai length(Receive: ${structure_length}, Expected: ${STRUCTURE_LENGTH}).`);

        const data = {
            structure_length,
            host_protocol_code : buffer.readUInt8(1),
            ip                 : buffer.slice(2, 6).join('.'),
            port               : buffer.readUInt16(6)
        }
        if (!(data.host_protocol_code in HPAI_HOST_PROTOCOL_CODES)) console.warn(`Unsupported HOST_PROTOCOL_CODES(Receive: ${data.host_protocol_code})`);

        return data;
    }
    static toBuffer({ structure_length, host_protocol_code, ip, port}) {
        if (!(host_protocol_code in HPAI_HOST_PROTOCOL_CODES)) console.warn(`Unsupported HOST_PROTOCOL_CODES(Receive: ${host_protocol_code})`);

        const buffer = Buffer.alloc(STRUCTURE_LENGTH);
        buffer.writeUInt8(STRUCTURE_LENGTH, 0);
        buffer.writeUInt8(host_protocol_code, 1);
        buffer.set(Buffer.from(ip.split('.').map(v => parseInt(v, 10))), 2);
        buffer.writeUInt16BE(port, 6);
        return buffer;
    }
    static KNX_ATTRIBUTES = ['structure_length', 'host_protocol_code', 'ip', 'port'];
}

module.exports = HPAI;
