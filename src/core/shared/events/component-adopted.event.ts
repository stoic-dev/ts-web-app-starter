export class ComponentAdoptedEvent extends Event {
    constructor() {
        super('component-adopted', { bubbles: true });
    }
}
