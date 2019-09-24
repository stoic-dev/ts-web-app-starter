import { GlobalWithFetchMock } from 'jest-fetch-mock';

import { mockConfiguration } from '../mock/mock.configuration';
import { FileConfigurationLoader } from './file.configuration.loader';

describe('FileConfigurationLoader', () => {
    describe('when load is called', () => {
        test('should load the configuration file and return an IConfigurationModel object', () => {
            const loader = new FileConfigurationLoader('configFileUrl');

            (global as GlobalWithFetchMock).fetch.mockResponseOnce(JSON.stringify(mockConfiguration));

            expect(loader.load()).resolves.toEqual(mockConfiguration);

            (global as GlobalWithFetchMock).fetch.mockReset();
        });
    });
});
