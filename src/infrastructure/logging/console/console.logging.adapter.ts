import { ILoggingPort } from '../logging.port';

export class ConsoleLoggingAdapter implements ILoggingPort {
    public logDebug(message: string): void {
        console.debug(message);
    }

    public logError(message: string): void {
        console.error(message);
    }

    public logSuccess(message: string): void {
        console.log(message);
    }

    public logWarning(message: string): void {
        console.warn(message);
    }
}
