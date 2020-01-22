const EVENT_NAME = 'component-connected';

export class ComponentConnectedEvent extends Event {
    constructor() {
        super(EVENT_NAME, {
            bubbles: true
        });
    }

    public static get eventName(): string {
        return EVENT_NAME;
    }
}
