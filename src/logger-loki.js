const crypto = require('crypto')
const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");

const options = {
    transports: [
        new LokiTransport({
            host: "http://127.0.0.1:3100",
            labels: {
                application: 'grafana-loki'
            }
        }),
    ]
};

const logger = createLogger(options);

logger.info('tests', { context: 'grafana-loki', referrer: crypto.randomUUID() });
logger.error('tests', { context: 'grafana-loki-err', referrer: crypto.randomUUID() });
logger.warn('test', { context: 'grafana-loki-warn', referrer: crypto.randomUUID() });

process.exit();