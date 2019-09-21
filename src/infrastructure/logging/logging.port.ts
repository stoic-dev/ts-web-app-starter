import { ILogMessage } from './log-message/log-message';

export interface ILoggingPort {
    logCritical(message: ILogMessage): void;
    logDebug(message: ILogMessage): void;
    logError(message: ILogMessage): void;
    logSuccess(message: ILogMessage): void;
    logVerbose(message: ILogMessage): void;
    logWarning(message: ILogMessage): void;
}
