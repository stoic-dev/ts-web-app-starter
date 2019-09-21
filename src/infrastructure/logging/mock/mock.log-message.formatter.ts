import { LogLevel } from '../log-level.enum';
import { ILogMessage } from '../log-message/log-message';
import { ILogMessageFormatter } from '../log-message/log-message.formatter';

export class MockLogMessageFormatter implements ILogMessageFormatter {
    public format(message: ILogMessage, level: LogLevel): string {
        return void 0;
    }
}
