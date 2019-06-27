import * as bootstrappers from './bootstrappers/bootstrappers.index';

// This is defined at build time by the Webpack DefinePlugin
declare const DEFAULT_CONFIG_PATH: string;

for (const bootstrapper of Object.values(bootstrappers)) {
    if ('bootstrap' in bootstrapper && bootstrapper.bootstrap instanceof Function) {
        bootstrapper.bootstrap();
    }
}

const container = document.createElement('div');

// Fetch the application config
fetch(DEFAULT_CONFIG_PATH).then(response => {
    response.json().then((config: { ENVIRONMENT: string }) => {
        container.innerText = `Environment: ${config.ENVIRONMENT}`;
        document.body.appendChild(container);
    });
});
