export interface ILoggingStyle {
    readonly backgroundColor: LogColor;
    readonly textColor: LogColor;
}

type LogColor = 'red' | 'yellow' | 'green' | 'blue' | 'cyan' | 'white';
