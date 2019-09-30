export class ComponentDisconnectedEvent extends Event {
    constructor() {
        super('component-disconnected', {
            bubbles: true
        });
    }
}
