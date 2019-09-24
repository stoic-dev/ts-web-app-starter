import { instance, mock, verify, when } from 'ts-mockito';

import { mockConfiguration } from '../../configuration/configuration.index';
import { LogLevel } from '../log-level.enum';
import { ILogMessage } from '../log-message/log-message';
import { ILogMessageFormatter } from '../log-message/log-message.formatter';
import { ILoggingStyle } from '../logging.style';
import { MockLogMessageFormatter } from '../mock/mock.log-message.formatter';
import { ConsoleLoggingAdapter } from './console.logging.adapter';

const formattedMessage = 'formattedMessage';
const logMessage: ILogMessage = {
    body: 'test message',
    subject: 'test',
    tags: ['test'],
    timestamp: new Date()
};
const logMessageWithTrace: ILogMessage = { ...logMessage, trace: 'test trace' };

describe('ConsoleLoggingAdapter', () => {
    describe('when logWarning is called', () => {
        test('should log a warning message to the console', () => {
            const consoleSpy = getConsoleSpy('warn');
            const mockFormatter = createMockFormatter(mocked => {
                when(mocked.format(logMessage, LogLevel.WARNING)).thenReturn(
                    formattedMessage
                );

                return mocked;
            });

            const loggingAdapter = new ConsoleLoggingAdapter(
                instance(mockFormatter),
                mockConfiguration.logging
            );

            loggingAdapter.logWarning(logMessage);

            verify(mockFormatter.format(logMessage, LogLevel.WARNING)).once();
            const {
                prefixStyle,
                messageStyle
            } = mockConfiguration.logging.warning;
            const styleStrings = getConsoleStyleStrings(prefixStyle, messageStyle);
            expect(consoleSpy).toBeCalledWith(
                `%c${logMessage.subject}%c${formattedMessage}`,
                styleStrings.prefixStyleString,
                styleStrings.messageStyleString
            );
        });
    });
    describe('when logError is called', () => {
        test('should log an error message to the console', () => {
            const consoleSpy = getConsoleSpy('error');
            const mockFormatter = createMockFormatter(mocked => {
                when(mocked.format(logMessage, LogLevel.ERROR)).thenReturn(
                    formattedMessage
                );

                return mocked;
            });

            const loggingAdapter = new ConsoleLoggingAdapter(
                instance(mockFormatter),
                mockConfiguration.logging
            );

            loggingAdapter.logError(logMessage);

            verify(mockFormatter.format(logMessage, LogLevel.ERROR)).once();
            const {
                prefixStyle,
                messageStyle
            } = mockConfiguration.logging.error;
            const styleStrings = getConsoleStyleStrings(prefixStyle, messageStyle);
            expect(consoleSpy).toBeCalledWith(
                `%c${logMessage.subject}%c${formattedMessage}`,
                styleStrings.prefixStyleString,
                styleStrings.messageStyleString
            );
        });
        test('should log trace to console if provided in message', () => {
            const consoleGroupSpy = getConsoleSpy('group');
            const consoleLogSpy = getConsoleSpy('log');
            const consoleGroupEndSpy = getConsoleSpy('groupEnd');

            const mockFormatter = createMockFormatter(mocked => {
                when(
                    mocked.format(logMessageWithTrace, LogLevel.ERROR)
                ).thenReturn(formattedMessage);

                return mocked;
            });

            const loggingAdapter = new ConsoleLoggingAdapter(
                instance(mockFormatter),
                mockConfiguration.logging
            );

            loggingAdapter.logError(logMessageWithTrace);

            verify(
                mockFormatter.format(logMessageWithTrace, LogLevel.ERROR)
            ).once();
            expect(consoleGroupSpy).toBeCalledWith('Trace');
            expect(consoleLogSpy).toBeCalledWith(logMessageWithTrace.trace);
            expect(consoleGroupEndSpy).toBeCalledTimes(1);

            consoleGroupEndSpy.mockClear();
        });
    });
    describe('when logCritical is called', () => {
        test('should log a critical error message to the console', () => {
            const consoleSpy = getConsoleSpy('error');
            const mockFormatter = createMockFormatter(mocked => {
                when(mocked.format(logMessage, LogLevel.CRITICAL)).thenReturn(
                    formattedMessage
                );

                return mocked;
            });

            const loggingAdapter = new ConsoleLoggingAdapter(
                instance(mockFormatter),
                mockConfiguration.logging
            );

            loggingAdapter.logCritical(logMessage);

            verify(mockFormatter.format(logMessage, LogLevel.CRITICAL)).once();
            const {
                prefixStyle,
                messageStyle
            } = mockConfiguration.logging.critical;
            const styleStrings = getConsoleStyleStrings(prefixStyle, messageStyle);
            expect(consoleSpy).toBeCalledWith(
                `%c${logMessage.subject}%c${formattedMessage}`,
                styleStrings.prefixStyleString,
                styleStrings.messageStyleString
            );
        });
        test('should log trace to console if provided in message', () => {
            const consoleGroupSpy = getConsoleSpy('group');
            const consoleLogSpy = getConsoleSpy('log');
            const consoleGroupEndSpy = getConsoleSpy('groupEnd');

            const mockFormatter = createMockFormatter(mocked => {
                when(
                    mocked.format(logMessageWithTrace, LogLevel.CRITICAL)
                ).thenReturn(formattedMessage);

                return mocked;
            });

            const loggingAdapter = new ConsoleLoggingAdapter(
                instance(mockFormatter),
                mockConfiguration.logging
            );

            loggingAdapter.logCritical(logMessageWithTrace);

            verify(
                mockFormatter.format(logMessageWithTrace, LogLevel.CRITICAL)
            ).once();
            expect(consoleGroupSpy).toBeCalledWith('Trace');
            expect(consoleLogSpy).toBeCalledWith(logMessageWithTrace.trace);
            expect(consoleGroupEndSpy).toBeCalledTimes(1);

            consoleGroupEndSpy.mockClear();
        });
    });
    describe('when logDebug is called', () => {
        test('should log a debug message to the console', () => {
            const consoleSpy = getConsoleSpy('debug');
            const mockFormatter = createMockFormatter(mocked => {
                when(mocked.format(logMessage, LogLevel.DEBUG)).thenReturn(
                    formattedMessage
                );

                return mocked;
            });

            const loggingAdapter = new ConsoleLoggingAdapter(
                instance(mockFormatter),
                mockConfiguration.logging
            );

            loggingAdapter.logDebug(logMessage);

            verify(mockFormatter.format(logMessage, LogLevel.DEBUG)).once();
            const {
                prefixStyle,
                messageStyle
            } = mockConfiguration.logging.debug;
            const styleStrings = getConsoleStyleStrings(prefixStyle, messageStyle);
            expect(consoleSpy).toBeCalledWith(
                `%c${logMessage.subject}%c${formattedMessage}`,
                styleStrings.prefixStyleString,
                styleStrings.messageStyleString
            );
        });
    });
    describe('when logVerbose is called', () => {
        test('should log a verbose message to the console', () => {
            const consoleSpy = getConsoleSpy('log');
            const mockFormatter = createMockFormatter(mocked => {
                when(mocked.format(logMessage, LogLevel.VERBOSE)).thenReturn(
                    formattedMessage
                );

                return mocked;
            });

            const loggingAdapter = new ConsoleLoggingAdapter(
                instance(mockFormatter),
                mockConfiguration.logging
            );

            loggingAdapter.logVerbose(logMessage);

            verify(mockFormatter.format(logMessage, LogLevel.VERBOSE)).once();
            const {
                prefixStyle,
                messageStyle
            } = mockConfiguration.logging.verbose;
            const styleStrings = getConsoleStyleStrings(prefixStyle, messageStyle);
            expect(consoleSpy).toBeCalledWith(
                `%c${logMessage.subject}%c${formattedMessage}`,
                styleStrings.prefixStyleString,
                styleStrings.messageStyleString
            );
        });
    });
    describe('when logSuccess is called', () => {
        test('should log a success message to the console', () => {
            const consoleSpy = getConsoleSpy('log');
            const mockFormatter = createMockFormatter(mocked => {
                when(mocked.format(logMessage, LogLevel.SUCCESS)).thenReturn(
                    formattedMessage
                );

                return mocked;
            });

            const loggingAdapter = new ConsoleLoggingAdapter(
                instance(mockFormatter),
                mockConfiguration.logging
            );

            loggingAdapter.logSuccess(logMessage);

            verify(mockFormatter.format(logMessage, LogLevel.SUCCESS)).once();
            const {
                prefixStyle,
                messageStyle
            } = mockConfiguration.logging.success;
            const styleStrings = getConsoleStyleStrings(prefixStyle, messageStyle);
            expect(consoleSpy).toBeCalledWith(
                `%c${logMessage.subject}%c${formattedMessage}`,
                styleStrings.prefixStyleString,
                styleStrings.messageStyleString
            );
        });
    });
});

function getConsoleSpy(
    consoleMethod: Exclude<keyof Console, 'Console'>
): jest.SpyInstance {
    return jest.spyOn(console, consoleMethod);
}

function createMockFormatter(
    configurationExpression: (
        target: ILogMessageFormatter
    ) => ILogMessageFormatter
): ILogMessageFormatter {
    return configurationExpression(mock(MockLogMessageFormatter));
}

function getConsoleStyleStrings(prefixStyle: ILoggingStyle, messageStyle: ILoggingStyle): { prefixStyleString: string, messageStyleString: string } {
    return {
        messageStyleString: `color: ${messageStyle.textColor}; background-color: ${messageStyle.backgroundColor}; font-weight: bold;`,
        prefixStyleString: `color: ${prefixStyle.textColor}; background-color: ${prefixStyle.backgroundColor}; font-weight: bold; padding: 2px 0.5em; border-radius: 0.5em; margin-right: 5px;`
    };
}
