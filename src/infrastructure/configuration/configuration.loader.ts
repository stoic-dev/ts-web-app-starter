import { IConfigurationModel } from './configuration.model';

export interface IConfigurationLoader {
    load(): Promise<IConfigurationModel>;
}
