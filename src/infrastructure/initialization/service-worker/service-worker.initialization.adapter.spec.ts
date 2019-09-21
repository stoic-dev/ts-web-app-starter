import { instance, mock, when } from 'ts-mockito';

import {
    IConfigurationPort,
    MockConfigurationAdapter
} from '../../configuration/configuration.index';
import { ILoggingPort, MockLoggingAdapter } from '../../logging/logging.index';
import { ServiceWorkerInitializationAdapter } from './service-worker.initialization.adapter';

type Configurator<T> = (target: T) => T;

const serviceWorkerPath = '<service-worker-path>';

describe('ServiceWorkerInitializationAdapter', () => {
    describe('when initialize is called', () => {
        test('should throw an error if Service Workers are not supported', async () => {
            const configurationAdapter = instance(
                createMockConfigurationPort()
            );
            const loggingAdapter = instance(createMockLoggingAdapter());
            const initializationAdapter = createServiceWorkerInitializationAdapter(
                configurationAdapter,
                loggingAdapter
            );

            expect(initializationAdapter.initialize()).rejects.toThrow();
        });

        test('should register Service Worker', () => {
            setupWindowNavigator(() => Promise.resolve({} as any));

            const configurationAdapter = instance(
                createMockConfigurationPort(mocked => {
                    when(
                        mocked.getConfigurationSetting<string>('SERVICE_WORKER_PATH')
                    ).thenResolve(serviceWorkerPath);

                    return mocked;
                })
            );
            const loggingAdapter = instance(createMockLoggingAdapter());
            const initializationAdapter = new ServiceWorkerInitializationAdapter(
                configurationAdapter,
                loggingAdapter
            );

            expect(initializationAdapter.initialize()).resolves.toBeDefined();
        });
    });
});

function createServiceWorkerInitializationAdapter(
    configurationAdapter: IConfigurationPort,
    loggingAdapter: ILoggingPort
) {
    return new ServiceWorkerInitializationAdapter(
        configurationAdapter,
        loggingAdapter
    );
}

function createMockConfigurationPort(
    configurator: Configurator<IConfigurationPort> = mocked => mocked
): IConfigurationPort {
    return configurator(mock(MockConfigurationAdapter));
}

function createMockLoggingAdapter(
    configurator: Configurator<ILoggingPort> = mocked => mocked
): ILoggingPort {
    return configurator(mock(MockLoggingAdapter));
}

function setupWindowNavigator(
    registrationFunction: () => Promise<ServiceWorkerRegistration>
): void {
    Object.defineProperty(window.navigator, 'serviceWorker', {
        configurable: true,
        value: {
            register: registrationFunction
        },
        writable: true
    });
}
