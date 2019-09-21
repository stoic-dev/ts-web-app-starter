import { LogLevel } from '../log-level.enum';
import { ILogMessage } from './log-message';
import { LogMessageFormatter } from './log-message.formatter';

const message: ILogMessage = {
    body: 'test message',
    subject: 'test',
    tags: ['test'],
    timestamp: new Date()
};

describe('LogMessageFormatter', () => {
    describe('when format is called', () => {
        test('should return the formatted ILogMessage as a string', () => {
            const formatter = new LogMessageFormatter();

            expect(formatter.format(message, LogLevel.DEBUG)).toBe(
                `${message.timestamp.toISOString()} | ${
                    LogLevel[LogLevel.DEBUG]
                } | [${message.subject}] | ${
                    message.body
                } | <${message.tags.join(',')}>`
            );
        });
    });
});
