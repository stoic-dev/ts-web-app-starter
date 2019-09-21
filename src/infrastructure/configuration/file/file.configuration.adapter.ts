import { IConfigurationLoader } from '../configuration.loader';
import { IConfigurationModel } from '../configuration.model';
import { IConfigurationPort } from '../configuration.port';

export class FileConfigurationAdapter implements IConfigurationPort {
    private readonly _configurationLoader: IConfigurationLoader;
    private _configuration: IConfigurationModel;

    constructor(configurationLoader: IConfigurationLoader) {
        this._configurationLoader = configurationLoader;
    }

    public async getConfigurationSetting<TValue>(
        settingName: keyof IConfigurationModel
    ): Promise<TValue> {
        if (this._configuration) {
            return Promise.resolve((this._configuration[
                settingName
            ] as unknown) as TValue);
        }

        return ((await this.loadConfiguration())[
            settingName
        ] as unknown) as TValue;
    }

    private async loadConfiguration(): Promise<IConfigurationModel> {
        const configuration = await this._configurationLoader.load();

        this._configuration = configuration;

        return configuration;
    }
}
