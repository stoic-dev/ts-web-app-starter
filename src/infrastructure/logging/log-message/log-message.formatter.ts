import { LogLevel } from '../log-level.enum';
import { ILogMessage } from './log-message';

export interface ILogMessageFormatter {
    format(message: ILogMessage, level: LogLevel): string;
}

export class LogMessageFormatter implements ILogMessageFormatter {
    public format(message: ILogMessage, level: LogLevel): string {
        return `${message.timestamp.toISOString()} | ${LogLevel[level]} | [${
            message.subject
        }] | ${message.body} | <${message.tags.join(',')}>`;
    }
}
