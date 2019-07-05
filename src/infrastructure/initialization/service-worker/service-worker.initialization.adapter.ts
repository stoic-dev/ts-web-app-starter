import { IInitializationPort } from '../initialization.port';
import { ILoggingPort } from '../../logging/logging.index';
import { IConfigurationPort } from '../../configuration/configuration.index';

export class ServiceWorkerInitializationAdapter implements IInitializationPort {
    private readonly _configurationAdapter: IConfigurationPort;
    private readonly _loggingAdapter: ILoggingPort;

    constructor(
        configurationAdapter: IConfigurationPort,
        loggingAdapter: ILoggingPort
    ) {
        this._configurationAdapter = configurationAdapter;
        this._loggingAdapter = loggingAdapter;
    }

    public initialize(): void {
        if (!this.doesSupportServiceWorker()) {
            this._loggingAdapter.logError(
                'Service Workers are not supported in this browser!'
            );
        }

        window.addEventListener('load', () => {
            this.getServiceWorkerPath().then(path =>
                navigator.serviceWorker
                    .register(path)
                    .then(
                        () =>
                            this._loggingAdapter.logSuccess(
                                'Service Worker Registered!'
                            ),
                        error => this._loggingAdapter.logError(error)
                    )
            );
        });
    }

    private doesSupportServiceWorker(): boolean {
        return 'serviceWorker' in navigator;
    }

    private async getServiceWorkerPath(): Promise<string> {
        return this._configurationAdapter.getConfigurationSetting(
            'SERVICE_WORKER_PATH'
        );
    }
}
