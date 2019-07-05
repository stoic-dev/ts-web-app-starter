import { IConfigurationModel } from '../configuration.model';

export class ConfigurationLoader {
    private readonly _configurationUrl: string;

    constructor(configurationUrl: string) {
        this._configurationUrl = configurationUrl;
    }

    public async load(): Promise<IConfigurationModel> {
        return fetch(this._configurationUrl).then(
            response => response.json() as Promise<IConfigurationModel>
        );
    }
}
