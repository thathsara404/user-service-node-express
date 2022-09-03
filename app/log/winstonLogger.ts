import * as winston from 'winston';
const { combine, timestamp, json } = winston.format;

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};

const level = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
};

winston.addColors(colors);

const transports = [
    new winston.transports.Console()
];

const WinstonLogger = winston.createLogger({
    level: level(),
    levels,
    format: combine(timestamp(), json()),
    transports,
    defaultMeta: { service: 'User-Service-API' }
});

export default WinstonLogger;
