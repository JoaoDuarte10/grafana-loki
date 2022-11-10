const crypto = require('crypto')
const { createLogger, transports, format } = require("winston");
const winston = require('winston')
const LokiTransport = require("winston-loki");
const { combine, timestamp, printf } = format;

const customFormat = printf(({ timestamp, level, message }) => {
    return `${timestamp} | ${level}: ${message}`;
});

const options = {
    transports: [
        new transports.File({
            filename: 'logs/app.log',
        }),
        new LokiTransport({
            format: winston.format.json(),
            host: "http://localhost:3100",
            labels: {
                application: 'grafana-loki'
            },
        }),
        new winston.transports.Console({
            format: combine(
                format.colorize(),
                format.splat(),
                format.simple(),
                timestamp(),
                customFormat,
            ),
        }),
    ]
};

const logger = createLogger(options);

logger.info('Application Logger Start Test', { referrer: crypto.randomUUID() });
logger.error('Application Logger Start Test', { referrer: crypto.randomUUID() });
logger.warn('Application Logger Start Test', { referrer: crypto.randomUUID() });
