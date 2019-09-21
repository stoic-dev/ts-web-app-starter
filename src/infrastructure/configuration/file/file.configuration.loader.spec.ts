import { GlobalWithFetchMock } from 'jest-fetch-mock';

import { IConfigurationModel } from '../configuration.model';
import { FileConfigurationLoader } from './file.configuration.loader';

const config: IConfigurationModel = {
    ENVIRONMENT: 'test',
    SERVICE_WORKER_PATH: 'test'
};

describe('FileConfigurationLoader', () => {
    describe('when load is called', () => {
        test('should load the configuration file and return an IConfigurationModel object', () => {
            const loader = new FileConfigurationLoader('configFileUrl');

            (global as GlobalWithFetchMock).fetch.mockResponseOnce(JSON.stringify(config));

            expect(loader.load()).resolves.toEqual(config);

            (global as GlobalWithFetchMock).fetch.mockReset();
        });
    });
});
