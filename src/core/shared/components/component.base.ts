import { IComponent } from './component';
import { ComponentAttributeChangedEvent } from '../events/events.index';

export abstract class Component extends HTMLElement implements IComponent {
    private readonly _shadowRoot: ShadowRoot;

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._setupShadowRoot();

        this.addEventListener(
            ComponentAttributeChangedEvent.eventName,
            this._updateComponent
        );
    }

    public abstract render(): Node;

    private _updateComponent(): void {
        this._teardownShadowRoot();
        this._setupShadowRoot();
    }

    private _teardownShadowRoot(): void {
        this._shadowRoot.childNodes.forEach(node =>
            this._shadowRoot.removeChild(node)
        );
    }

    private _setupShadowRoot(): void {
        this._shadowRoot.appendChild(this.render());
    }
}
