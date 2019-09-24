import { ILoggingPort } from '../../logging/logging.index';
import { IInitializationPort } from '../initialization.port';

export class ServiceWorkerInitializationAdapter
    implements IInitializationPort<Promise<ServiceWorkerRegistration>> {
    private readonly _serviceWorkerPath: string;
    private readonly _loggingAdapter: ILoggingPort;

    constructor(serviceWorkerPath: string, loggingAdapter: ILoggingPort) {
        this._serviceWorkerPath = serviceWorkerPath;
        this._loggingAdapter = loggingAdapter;
    }

    public async initialize(): Promise<ServiceWorkerRegistration> {
        if (!this._doesSupportServiceWorker()) {
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

        return this._registerServiceWorker();
    }

    private _doesSupportServiceWorker(): boolean {
        return navigator.serviceWorker !== undefined;
    }

    private async _registerServiceWorker(): Promise<ServiceWorkerRegistration> {
        const registration = await navigator.serviceWorker.register(
            this._serviceWorkerPath
        );

        this._loggingAdapter.logSuccess({
            body: 'Service Worker Registered!',
            subject: 'Service Worker',
            tags: ['service-worker', 'initializer'],
            timestamp: new Date()
        });

        return registration;
    }
}
