/* tslint:disable:no-console */

import { LogLevel } from '../log-level.enum';
import { ILogMessage } from '../log-message/log-message';
import { ILogMessageFormatter } from '../log-message/log-message.formatter';
import {
    ILoggingConfiguration,
    ILoggingStyle,
    ILogLevelConfiguration
} from '../logging.configuration';
import { ILoggingPort } from '../logging.port';

export class ConsoleLoggingAdapter implements ILoggingPort {
    private readonly _formatter: ILogMessageFormatter;
    private readonly _configuration: ILoggingConfiguration;

    constructor(
        formatter: ILogMessageFormatter,
        configuration: ILoggingConfiguration
    ) {
        this._formatter = formatter;
        this._configuration = Object.freeze(configuration);
    }

    public logCritical(message: ILogMessage): void {
        this._printLogMessage('error', message, LogLevel.CRITICAL);
    }

    public logDebug(message: ILogMessage): void {
        this._printLogMessage('debug', message, LogLevel.DEBUG);
    }

    public logError(message: ILogMessage): void {
        this._printLogMessage('error', message, LogLevel.ERROR);
    }

    public logSuccess(message: ILogMessage): void {
        this._printLogMessage('log', message, LogLevel.SUCCESS);
    }

    public logVerbose(message: ILogMessage): void {
        this._printLogMessage('log', message, LogLevel.VERBOSE);
    }

    public logWarning(message: ILogMessage): void {
        this._printLogMessage('warn', message, LogLevel.WARNING);
    }

    private _printLogMessage(
        method: ConsoleMethod,
        logMessage: ILogMessage,
        logLevel: LogLevel
    ): void {
        const { message, styles } = this._createFormattedLogMessage(
            logMessage,
            logLevel
        );

        (console[method] as Function)(message, ...styles);

        if (logMessage.trace) {
            this._printTrace(logMessage.trace);
        }
    }

    private _getStylesForLogLevel(logLevel: LogLevel): ILogLevelConfiguration {
        return this._configuration[
            LogLevel[logLevel].toLowerCase() as keyof ILoggingConfiguration
        ];
    }

    private _createFormattedLogMessage(
        message: ILogMessage,
        logLevel: LogLevel
    ): IFormattedLogMessage {
        const { messageStyle, prefixStyle } = this._getStylesForLogLevel(
            logLevel
        );
        const prefix = this._createLogMessagePrefix(
            message.subject,
            prefixStyle
        );
        return {
            message: `${prefix.message}%c${this._formatter.format(
                message,
                logLevel
            )}`,
            styles: [
                ...prefix.styles,
                `${this._convertConsoleStyleToString(
                    messageStyle
                )} font-weight: bold;`
            ]
        };
    }

    private _createLogMessagePrefix(
        prefixLabel: string,
        prefixStyle: ILoggingStyle
    ): IFormattedLogMessage {
        return {
            message: `%c${prefixLabel}`,
            styles: [
                `${this._convertConsoleStyleToString(
                    prefixStyle
                )} font-weight: bold; padding: 2px 0.5em; border-radius: 0.5em; margin-right: 5px;`
            ]
        };
    }

    private _convertConsoleStyleToString(style: ILoggingStyle): string {
        return `color: ${
            style.textColor
        }; background-color: ${style.backgroundColor || 'white'};`;
    }

    private _printTrace(trace: string): void {
        console.group('Trace');
        console.log(trace);
        console.groupEnd();
    }
}

interface IFormattedLogMessage {
    message: string;
    styles: Array<string>;
}

type ConsoleMethod = Exclude<keyof Console, 'Console'>;
