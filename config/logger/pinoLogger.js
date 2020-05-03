const pino = require('pino');
const expressPino = require('express-pino-logger');

const config = require('../config')

const pinoLogger = pino( {
        level : config.logLevel,
        prettyPrint: true
    }
);
const pinoExpressLogger = expressPino(pinoLogger);

module.exports = {pinoLogger, pinoExpressLogger};