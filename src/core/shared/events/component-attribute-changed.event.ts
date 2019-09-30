export class ComponentAttributeChangedEvent extends CustomEvent<
    IComponentAttributeChangedData
> {
    constructor(eventData: IComponentAttributeChangedData) {
        super('component-attribute-changed', {
            bubbles: true,
            detail: eventData
        });
    }
}

interface IComponentAttributeChangedData {
    attributeName: string;
    oldAttributeValue: string;
    newAttributeValue: string;
}
