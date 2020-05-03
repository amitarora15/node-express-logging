const winston = require('winston');
const config = require('../config')

let winstonLogger = winston.createLogger({
    level: config.logLevel,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint({colorize: true}),
        winston.format.splat(),
        winston.format.json(),
        winston.format.printf(info => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            dirname: './logs',
            filename: 'winston_error.log',
            level: 'error'
        }),
        new winston.transports.File({
            dirname: './logs',
            filename: 'users_winston.log',
            zippedArchive: false,
            maxsize: 2000,
            maxFiles: 2
        })]
});

module.exports = {winstonLogger};