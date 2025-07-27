import { createLogger, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import {
    appLoggerConfig,
    devFormat,
    errorLoggerConfig,
    prodFormat,
} from '../configs/logger.config';

const isProd = process.env.NODE_ENV === 'production';

const logger = createLogger({
    level: 'info',
    format: isProd ? prodFormat : devFormat,
    transports: [
        new transports.Console(),

        ...(isProd
            ? [
                  new DailyRotateFile(appLoggerConfig),
                  new DailyRotateFile(errorLoggerConfig),
              ]
            : []),
    ],
});

export default logger;
