import { IConfigurationModel } from './configuration.model';

export interface IConfigurationPort {
    getConfigurationSetting<TValue>(settingName: keyof IConfigurationModel): Promise<TValue>;
}
