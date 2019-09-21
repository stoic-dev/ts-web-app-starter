import {
    ConsoleLoggingAdapter,
    FileConfigurationAdapter,
    FileConfigurationLoader,
    LogMessageFormatter,
    ServiceWorkerInitializationAdapter
} from './infrastructure/infrastructure.index';

// This is defined at build time by the Webpack DefinePlugin
declare const DEFAULT_CONFIG_PATH: string;

(async function main() {
    const configurationLoader = new FileConfigurationLoader(
        DEFAULT_CONFIG_PATH
    );
    const configurationAdapter = new FileConfigurationAdapter(
        configurationLoader
    );
    const loggingAdapter = new ConsoleLoggingAdapter(new LogMessageFormatter());
    const initializationAdapter = new ServiceWorkerInitializationAdapter(
        configurationAdapter,
        loggingAdapter
    );

    try {
        await initializationAdapter.initialize();
    } finally {
        const containerElement = document.createElement('div');
        const environment = await configurationAdapter.getConfigurationSetting<
            string
        >('ENVIRONMENT');

        containerElement.innerText = `Environment: ${environment}`;

        document.body.appendChild(containerElement);
    }
})();
