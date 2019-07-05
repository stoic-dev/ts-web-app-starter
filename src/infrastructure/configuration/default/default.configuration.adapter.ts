import { IConfigurationPort } from '../configuration.port';
import { IConfigurationModel } from '../configuration.model';
import { ConfigurationLoader } from './configuration-loader';

export class DefaultConfigurationAdapter implements IConfigurationPort {
    private readonly _configurationLoader: ConfigurationLoader;
    private _configuration: IConfigurationModel;

    constructor(configurationUrl: string) {
        this._configurationLoader = new ConfigurationLoader(configurationUrl);
    }

    public async getConfigurationSetting<TValue>(settingName: keyof IConfigurationModel): Promise<TValue> {
        if (this._configuration) {
            return Promise.resolve(this._configuration[settingName] as unknown as TValue);
        }

        const configuration = await this._configurationLoader.load();

        this._configuration = configuration;

        return configuration[settingName] as unknown as TValue;
    }
}
