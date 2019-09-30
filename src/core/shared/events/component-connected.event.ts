export class ComponentConnectedEvent extends Event {
    constructor() {
        super('component-connected', {
            bubbles: true
        });
    }
}
