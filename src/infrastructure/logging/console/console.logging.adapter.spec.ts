import { instance, mock, verify, when } from 'ts-mockito';

import { LogLevel } from '../log-level.enum';
import { ILogMessage } from '../log-message/log-message';
import { ILogMessageFormatter } from '../log-message/log-message.formatter';
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
                instance(mockFormatter)
            );

            loggingAdapter.logWarning(logMessage);

            verify(mockFormatter.format(logMessage, LogLevel.WARNING)).once();
            expect(consoleSpy).toBeCalledWith(
                `%c${formattedMessage}`,
                'color: yellow; font-weight: bold;'
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
                instance(mockFormatter)
            );

            loggingAdapter.logError(logMessage);

            verify(mockFormatter.format(logMessage, LogLevel.ERROR)).once();
            expect(consoleSpy).toBeCalledWith(
                `%c${formattedMessage}`,
                'color: red; font-weight: bold;'
            );
        });
        test('should log trace to console if provided in message', () => {
            const consoleGroupSpy = getConsoleSpy('group');
            const consoleLogSpy = getConsoleSpy('log');
            const consoleGroupEndSpy = getConsoleSpy('groupEnd');

            const mockFormatter = createMockFormatter(mocked => {
                when(mocked.format(logMessageWithTrace, LogLevel.ERROR)).thenReturn(
                    formattedMessage
                );

                return mocked;
            });

            const loggingAdapter = new ConsoleLoggingAdapter(
                instance(mockFormatter)
            );

            loggingAdapter.logError(logMessageWithTrace);

            verify(mockFormatter.format(logMessageWithTrace, LogLevel.ERROR)).once();
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
                instance(mockFormatter)
            );

            loggingAdapter.logCritical(logMessage);

            verify(mockFormatter.format(logMessage, LogLevel.CRITICAL)).once();
            expect(consoleSpy).toBeCalledWith(
                `%c${formattedMessage}`,
                'color: white; background-color: red; font-weight: bold;'
            );
        });
        test('should log trace to console if provided in message', () => {
            const consoleGroupSpy = getConsoleSpy('group');
            const consoleLogSpy = getConsoleSpy('log');
            const consoleGroupEndSpy = getConsoleSpy('groupEnd');

            const mockFormatter = createMockFormatter(mocked => {
                when(mocked.format(logMessageWithTrace, LogLevel.CRITICAL)).thenReturn(
                    formattedMessage
                );

                return mocked;
            });

            const loggingAdapter = new ConsoleLoggingAdapter(
                instance(mockFormatter)
            );

            loggingAdapter.logCritical(logMessageWithTrace);

            verify(mockFormatter.format(logMessageWithTrace, LogLevel.CRITICAL)).once();
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
                instance(mockFormatter)
            );

            loggingAdapter.logDebug(logMessage);

            verify(mockFormatter.format(logMessage, LogLevel.DEBUG)).once();
            expect(consoleSpy).toBeCalledWith(
                `%c${formattedMessage}`,
                'color: cyan; font-weight: bold;'
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
                instance(mockFormatter)
            );

            loggingAdapter.logVerbose(logMessage);

            verify(mockFormatter.format(logMessage, LogLevel.VERBOSE)).once();
            expect(consoleSpy).toBeCalledWith(
                `%c${formattedMessage}`,
                'color: blue; font-weight: bold;'
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
                instance(mockFormatter)
            );

            loggingAdapter.logSuccess(logMessage);

            verify(mockFormatter.format(logMessage, LogLevel.SUCCESS)).once();
            expect(consoleSpy).toBeCalledWith(
                `%c${formattedMessage}`,
                'color: green; font-weight: bold;'
            );
        });
    });
});

function getConsoleSpy(consoleMethod: Exclude<keyof Console, 'Console'>): jest.SpyInstance {
    return jest.spyOn(console, consoleMethod);
}

function createMockFormatter(
    configurationExpression: (
        target: ILogMessageFormatter
    ) => ILogMessageFormatter
): ILogMessageFormatter {
    return configurationExpression(mock(MockLogMessageFormatter));
}
