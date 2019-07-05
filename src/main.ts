import {
    ConsoleLoggingAdapter,
    DefaultConfigurationAdapter,
    ServiceWorkerInitializationAdapter
} from './infrastructure/infrastructure.index';

// This is defined at build time by the Webpack DefinePlugin
declare const DEFAULT_CONFIG_PATH: string;

(async () => {
    const configurationAdapter = new DefaultConfigurationAdapter(
        DEFAULT_CONFIG_PATH
    );
    const loggingAdapter = new ConsoleLoggingAdapter();
    const initializationAdapter = new ServiceWorkerInitializationAdapter(
        configurationAdapter,
        loggingAdapter
    );

    initializationAdapter.initialize();

    const containerElement = document.createElement('div');
    const environment = await configurationAdapter.getConfigurationSetting<
        string
    >('ENVIRONMENT');

    containerElement.innerText = `Environment: ${environment}`;

    document.body.appendChild(containerElement);
})();
