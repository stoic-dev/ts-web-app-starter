if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(
            registration => {
                // tslint:disable-next-line:no-console
                console.log('SW registered: ', registration);
            },
            error =>
                Promise.reject(
                    new Error(
                        `SW registration failed: ${JSON.stringify(error)}`
                    )
                )
        );
    });
}

const container = document.createElement('div');

fetch('/app.config.json').then(response => {
    response.json().then((config: { ENVIRONMENT: string }) => {
        container.innerText = `Environment: ${config.ENVIRONMENT}`;
        document.body.appendChild(container);
    });
});
