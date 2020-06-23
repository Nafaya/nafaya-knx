const { Buffer } = require('buffer');
const _ = require('underscore');

function serialize(v){
    return (v instanceof BaseKNXStructure) ? v.serialize() : (Array.isArray(v) ? v.map(serialize) : v );
}
class BaseKNXStructure {
    constructor(data) {
        this.cache = null;
        for(const k in this.constructor.KNX_ATTRIBUTES) this[k] = null;
        if (data instanceof Buffer) {
            _.defaults(this, this.constructor.fromBuffer(data));
        } else {
            this.update(data);
        }
    }
    serialize() {
        return Object.entries(_.pick(data, this.constructor.KNX_ATTRIBUTES)).map(([k, v]) => {
            return [k, serialize(v)]
        });
    }
    toBuffer() {
        return this.cache ? this.cache : this.cache = this.constructor.toBuffer(this);
    }
    update(data) {
        this.cache = null;
        Object.entries(_.pick(data, this.constructor.KNX_ATTRIBUTES)).forEach(([k, v]) => {
            if (this[k] instanceof BaseKNXStructure) this[k].update(v);
            else this[k] = (v instanceof BaseKNXStructure) ? new v.constructor.from(v) : v;
        });
        return this;
    }
    static toBuffer(){
        throw new Error('You tried to call an abstract method.');
    }
    static fromBuffer(){
        throw new Error('You tried to call an abstract method.');
    }
    static KNX_ATTRIBUTES = [];
    static from(data) {
        return new this(data);
    }
}


module.exports = BaseKNXStructure;
