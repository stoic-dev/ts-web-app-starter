export class ServiceWorkerBootstrapper {
    public static bootstrap(): void {
        if (!('serviceWorker' in navigator)) {
            return;
        }

        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js').then(
                registration => {
                    // tslint:disable-next-line:no-console
                    console.log('SW Registered: ', registration);
                },
                error => Promise.reject(new Error(error))
            );
        });
    }
}
