import WinstonLogger from '../log/winstonLogger';
import { basename } from 'path';
import LogType from '../const/logType';

/**
 * Wrapper for Winston Logger. This method will handle the relevant
 * Winston logger method.
 * @param {string} filePath Absolute file path to where the error occurred 
 * @returns {void}
 */
export const Logger = (filePath: string) => {
    return {
        // Calling different types of logger methods based on the type requested
        log: (message: string, type: LogType) => {
            const fileName = basename(filePath);
            const logMessage = `From ${fileName}. ${message}`;
            switch (type) {
                case LogType.INFO:
                    return WinstonLogger.info(logMessage);
                case LogType.WARN:
                    return WinstonLogger.warn(logMessage);
                case LogType.ERROR:
                    return WinstonLogger.error(logMessage);
                default:
                    return WinstonLogger.debug(logMessage);
            }
        }
    };
};
