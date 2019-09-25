export interface ILoggingConfiguration {
    readonly critical: ILogLevelConfiguration;
    readonly debug: ILogLevelConfiguration;
    readonly error: ILogLevelConfiguration;
    readonly success: ILogLevelConfiguration;
    readonly verbose: ILogLevelConfiguration;
    readonly warning: ILogLevelConfiguration;
}

export interface ILogLevelConfiguration {
    readonly messageStyle: ILoggingStyle;
    readonly prefixStyle: ILoggingStyle;
}

export interface ILoggingStyle {
    readonly backgroundColor: LogColor;
    readonly textColor: LogColor;
}

type LogColor = 'red' | 'yellow' | 'green' | 'blue' | 'cyan' | 'white';
