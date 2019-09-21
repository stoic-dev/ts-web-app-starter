import { IConfigurationModel } from '../configuration.model';
import { IConfigurationPort } from '../configuration.port';

export class MockConfigurationAdapter implements IConfigurationPort {
    public getConfigurationSetting<TValue>(
        settingName: keyof IConfigurationModel
    ): Promise<TValue> {
        return void 0;
    }
}
