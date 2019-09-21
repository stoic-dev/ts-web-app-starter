import { ILogMessage } from '../log-message/log-message';
import { ILoggingPort } from '../logging.port';

export class MockLoggingAdapter implements ILoggingPort {
    public logCritical(message: ILogMessage): void {
        return void 0;
    }

    public logDebug(message: ILogMessage): void {
        return void 0;
    }

    public logError(message: ILogMessage): void {
        return void 0;
    }

    public logSuccess(message: ILogMessage): void {
        return void 0;
    }

    public logVerbose(message: ILogMessage): void {
        return void 0;
    }

    public logWarning(message: ILogMessage): void {
        return void 0;
    }
}
