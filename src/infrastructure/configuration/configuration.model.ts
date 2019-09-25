import { ILoggingConfiguration } from '../logging/logging.index';

export interface IConfigurationModel {
    readonly environment: string;
    readonly serviceWorkerPath: string;
    readonly logging: ILoggingConfiguration;
}
