const EVENT_NAME = 'component-disconnected'

export class ComponentDisconnectedEvent extends Event {
    constructor() {
        super(EVENT_NAME, {
            bubbles: true
        });
    }

    public static get eventName(): string {
        return EVENT_NAME;
    }
}
