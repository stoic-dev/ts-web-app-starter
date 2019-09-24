import { ILoggingStyle } from '../logging/logging.style';

export interface IConfigurationModel {
    readonly environment: string;
    readonly serviceWorkerPath: string;
    readonly logging: ILoggingConfiguration;
}

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
