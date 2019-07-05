export interface ILoggingPort {
    logDebug(message: string): void;
    logError(message: string): void;
    logSuccess(message: string): void;
    logWarning(message: string): void;
}
