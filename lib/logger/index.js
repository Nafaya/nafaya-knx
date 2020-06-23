const DefaultLogger = require('./default');
let logger = new DefaultLogger();

if (process.env.NAFAYA_KNX_LOG_TAGS) logger.subscribe(process.env.NAFAYA_KNX_LOGS.split(';'));

module.exports = {
    get(){
        return logger;
    },
    set(_logger) {
        logger = _logger;
    }
}
