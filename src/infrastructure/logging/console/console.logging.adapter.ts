/* tslint:disable:no-console */

import { LogLevel } from '../log-level.enum';
import { ILogMessage } from '../log-message/log-message';
import { ILogMessageFormatter } from '../log-message/log-message.formatter';
import { ILoggingPort } from '../logging.port';

export class ConsoleLoggingAdapter implements ILoggingPort {
    private readonly _formatter: ILogMessageFormatter;

    constructor(formatter: ILogMessageFormatter) {
        this._formatter = formatter;
    }

    public logCritical(message: ILogMessage): void {
        console.error(
            `%c${this._formatter.format(message, LogLevel.CRITICAL)}`,
            'color: white; background-color: red; font-weight: bold;'
        );

        if (message.trace) {
            this.logTrace(message.trace);
        }
    }

    public logDebug(message: ILogMessage): void {
        console.debug(
            `%c${this._formatter.format(message, LogLevel.DEBUG)}`,
            'color: cyan; font-weight: bold;'
        );
    }

    public logError(message: ILogMessage): void {
        console.error(
            `%c${this._formatter.format(message, LogLevel.ERROR)}`,
            'color: red; font-weight: bold;'
        );

        if (message.trace) {
            this.logTrace(message.trace);
        }
    }

    public logSuccess(message: ILogMessage): void {
        console.log(
            `%c${this._formatter.format(message, LogLevel.SUCCESS)}`,
            'color: green; font-weight: bold;'
        );
    }

    public logVerbose(message: ILogMessage): void {
        console.log(
            `%c${this._formatter.format(message, LogLevel.VERBOSE)}`,
            'color: blue; font-weight: bold;'
        );
    }

    public logWarning(message: ILogMessage): void {
        console.warn(
            `%c${this._formatter.format(message, LogLevel.WARNING)}`,
            'color: yellow; font-weight: bold;'
        );
    }

    private logTrace(trace: string): void {
        console.group('Trace');
        console.log(trace);
        console.groupEnd();
    }
}
