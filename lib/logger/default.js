const EventEmitter = require('events');
const Reset = "\x1b[0m";
const FgRed = "\x1b[31m";
const FgGreen = "\x1b[32m";
const FgYellow = "\x1b[33m";


function isTagContainedInObject(object, tag){
    if ('*' in object) return true;

    const subroutines = tag.split('.');
    for (let i = 1; i <= subroutines.length; i++) {
        const path = subroutines.slice(0, i).join('.');
        if ((path in object) || (`${path}.*` in object)) return true;
    }

    return false;

}
class DefaultLogger extends EventEmitter {
    constructor() {
        super();
        this.subscribed = {};
        this.ignored = {};
    }
    ignore(data) {
        if (Array.isArray(data)) {
            data.forEach(this.ignore.bind(this));
            return;
        }
        this.ignored[data] = true;
    }
    subscribe(data) {
        if (Array.isArray(data)) {
            data.forEach(this.add.bind(this));
            return;
        }
        this.subscribed[data] = true;
    }
    isIgnored(tag) {
        return isTagContainedInObject(this.ignored, tag);
    }
    isSubscribed(tag) {
        return isTagContainedInObject(this.subscribed, tag);
    }
    isTagAccepted(tag) {
        return this.isSubscribed(tag) && !this.isIgnored(tag);
    }
    log(tag){
        if (!this.isTagAccepted(tag)) return;
        console.log(...arguments);
    }
    info(tag){
        if (!this.isTagAccepted(tag)) return;
        console.info(`${FgGreen}${tag}${Reset}`, ...arguments.slice(1))
    }
    warn(tag){
        if (!this.isTagAccepted(tag)) return;
        console.warn(`${FgYellow}${tag}${Reset}`, ...arguments.slice(1))
    }
    error(tag){
        if (!this.isTagAccepted(tag)) return;
        console.warn(`${FgRed}${tag}${Reset}`, ...arguments.slice(1))
    }
}
module.exports = DefaultLogger;