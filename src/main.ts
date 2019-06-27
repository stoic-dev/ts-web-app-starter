import * as bootstrappers from './bootstrappers/bootstrappers.index';

for (const bootstrapper of Object.values(bootstrappers)) {
    if ('bootstrap' in bootstrapper && bootstrapper.bootstrap instanceof Function) {
        bootstrapper.bootstrap();
    }
}

const container = document.createElement('div');

// Fetch the application config
fetch('/app.config.json').then(response => {
    response.json().then((config: { ENVIRONMENT: string }) => {
        container.innerText = `Environment: ${config.ENVIRONMENT}`;
        document.body.appendChild(container);
    });
});
