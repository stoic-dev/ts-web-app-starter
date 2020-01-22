const EVENT_NAME = 'component-attribute-changed';

export class ComponentAttributeChangedEvent extends CustomEvent<
    IComponentAttributeChangedData
> {
    constructor(eventData: IComponentAttributeChangedData) {
        super(EVENT_NAME, {
            bubbles: true,
            detail: eventData
        });
    }

    public static get eventName(): string {
        return EVENT_NAME;
    }
}

interface IComponentAttributeChangedData {
    attributeName: string;
    oldAttributeValue: string;
    newAttributeValue: string;
}
