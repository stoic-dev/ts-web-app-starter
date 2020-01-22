const EVENT_NAME = 'component-adopted';

export class ComponentAdoptedEvent extends Event {
    constructor() {
        super(EVENT_NAME, { bubbles: true });
    }

    public static get eventName(): string {
        return EVENT_NAME;
    }
}
