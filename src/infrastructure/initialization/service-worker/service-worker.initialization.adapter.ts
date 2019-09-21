import { IConfigurationPort } from '../../configuration/configuration.index';
import { ILoggingPort } from '../../logging/logging.index';
import { IInitializationPort } from '../initialization.port';

export class ServiceWorkerInitializationAdapter
    implements IInitializationPort<Promise<ServiceWorkerRegistration>> {
    private readonly _configurationAdapter: IConfigurationPort;
    private readonly _loggingAdapter: ILoggingPort;

    constructor(
        configurationAdapter: IConfigurationPort,
        loggingAdapter: ILoggingPort
    ) {
        this._configurationAdapter = configurationAdapter;
        this._loggingAdapter = loggingAdapter;
    }

    public async initialize(): Promise<ServiceWorkerRegistration> {
        if (!this.doesSupportServiceWorker()) {
            const error = new Error(
                'Service Workers are not supported in this browser!'
            );

            this._loggingAdapter.logError({
                body: error.message,
                subject: 'Service Worker',
                tags: ['service-worker', 'initializer'],
                timestamp: new Date(),
                trace: error.stack
            });

            return Promise.reject(error);
        }

        return new Promise(resolve => {
            const onLoadListener = async () => {
                const path = await this.getServiceWorkerPath();

                try {
                    resolve(await this.registerServiceWorker(path));
                } finally {
                    window.removeEventListener('load', onLoadListener);
                }
            };

            window.addEventListener('load', onLoadListener);
        });
    }

    private doesSupportServiceWorker(): boolean {
        return navigator.serviceWorker !== undefined;
    }

    private async registerServiceWorker(
        path: string
    ): Promise<ServiceWorkerRegistration> {
        const registration = await navigator.serviceWorker.register(path);

        this._loggingAdapter.logSuccess({
            body: 'Service Worker Registered!',
            subject: 'Service Worker',
            tags: ['service-worker', 'initializer'],
            timestamp: new Date()
        });

        return registration;
    }

    private async getServiceWorkerPath(): Promise<string> {
        return this._configurationAdapter.getConfigurationSetting(
            'SERVICE_WORKER_PATH'
        );
    }
}
