import {
    ComponentAdoptedEvent,
    ComponentAttributeChangedEvent,
    ComponentConnectedEvent,
    ComponentDisconnectedEvent
} from '../events/events.index';

export function component(config: IComponentConfiguration): ClassDecorator {
    return target => {
        setupObservedAttributes(target, config.observedAttributes);
        setupLifecycleCallbacks(target.prototype, [
            ['adoptedCallback', () => new ComponentAdoptedEvent()],
            [
                'attributeChangedCallback',
                (
                    attributeName: string,
                    oldAttributeValue: string,
                    newAttributeValue: string
                ) =>
                    new ComponentAttributeChangedEvent({
                        attributeName,
                        newAttributeValue,
                        oldAttributeValue
                    })
            ],
            ['connectedCallback', () => new ComponentConnectedEvent()],
            ['disconnectedCallback', () => new ComponentDisconnectedEvent()]
        ]);
        defineCustomElement(target, config.tagName);
    };
}

function setupObservedAttributes(
    target: any,
    attributeNames: Array<string> = []
): void {
    Object.defineProperty(target, 'observedAttributes', {
        value: attributeNames,
        writable: false
    });
}

function setupLifecycleCallbacks(
    prototype: any,
    lifecycleCallbacks: Array<[string, (...args: Array<any>) => Event]>
): void {
    for (const [lifecycleCallbackName, eventFactory] of lifecycleCallbacks) {
        attachLifecycleCallback(prototype, lifecycleCallbackName, eventFactory);
    }
}

function attachLifecycleCallback(
    prototype: any,
    name: string,
    eventFactory: (...args: Array<unknown>) => Event
): void {
    if (doesPropertyExist(prototype, name)) {
        return;
    }

    Object.defineProperty(prototype, name, {
        enumerable: false,
        value: function(...args: Array<unknown>) {
            if (this instanceof EventSource) {
                (this as EventSource).dispatchEvent(eventFactory(...args));
            }
        },
        writable: false
    });
}

function doesPropertyExist(target: any, propertyName: string): boolean {
    return Object.getOwnPropertyNames(target).includes(propertyName);
}

function defineCustomElement(ctor: Function, tagName: string): void {
    customElements.define(tagName, ctor);
}

interface IComponentConfiguration {
    readonly tagName: string;
    readonly observedAttributes?: Array<string>;
}
