export function component(config: IComponentConfiguration): ClassDecorator {
    return (target) => {
        Object.defineProperty(target, 'observedAttributes', {
            value: config.observedAttributes || [],
            writable: false
        });

        customElements.define(config.tagName, target);
    };
}

interface IComponentConfiguration {
    readonly tagName: string;
    readonly observedAttributes?: Array<string>;
}
