import {
    ConsoleLoggingAdapter,
    FileConfigurationAdapter,
    FileConfigurationLoader,
    ILoggingConfiguration,
    ILoggingPort,
    LogMessageFormatter,
    ServiceWorkerInitializationAdapter
} from './infrastructure/infrastructure.index';

// This is defined at build time by the Webpack DefinePlugin
declare const DEFAULT_CONFIG_PATH: string;

start();

function start() {
    const callback = async () => {
        try {
            await main();
        } finally {
            window.removeEventListener('load', callback);
        }
    };

    window.addEventListener('load', callback);
}

async function main() {
    const configurationLoader = new FileConfigurationLoader(
        DEFAULT_CONFIG_PATH
    );
    const configurationAdapter = new FileConfigurationAdapter(
        configurationLoader
    );
    const loggingConfiguration = await configurationAdapter.getConfigurationSetting<
        ILoggingConfiguration
    >('logging');
    const loggingAdapter = new ConsoleLoggingAdapter(
        new LogMessageFormatter(),
        loggingConfiguration
    );
    const serviceWorkerPath = await configurationAdapter.getConfigurationSetting<
        string
    >('serviceWorkerPath');

    initializeServiceWorker(serviceWorkerPath, loggingAdapter);

    const environment = await configurationAdapter.getConfigurationSetting<string>('environment');

    displayUI(environment);
}

async function initializeServiceWorker(
    serviceWorkerPath: string,
    loggingAdapter: ILoggingPort
): Promise<void> {
    const serviceWorkerInitializer = new ServiceWorkerInitializationAdapter(
        serviceWorkerPath,
        loggingAdapter
    );

    try {
        await serviceWorkerInitializer.initialize();
    } catch (e) {
        const error = e as Error;
        loggingAdapter.logError({
            body: error.message,
            subject: 'Service Worker',
            tags: ['service-worker', 'initializer'],
            timestamp: new Date(),
            trace: error.stack
        });
    }
}

function displayUI(environment: string): void {
    document.body.style.margin = '0';
}
