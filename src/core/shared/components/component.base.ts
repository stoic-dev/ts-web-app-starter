import { IArtifact } from '../artifacts/artifact';
import {
    ComponentAdoptedEvent,
    ComponentAttributeChangedEvent,
    ComponentConnectedEvent,
    ComponentDisconnectedEvent
} from '../events/events.index';
import { IComponent } from './component';

export abstract class Component extends HTMLElement implements IComponent {
    private readonly _shadowRoot: ShadowRoot;

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._setupShadowRoot();
    }

    public abstract render(): IArtifact<Node>;

    protected onAttributeChanged(
        name: string,
        oldValue: string,
        newValue: string
    ): void {
        return void 0;
    }

    protected onConnected(): void {
        return void 0;
    }

    protected onDisconnected(): void {
        return void 0;
    }

    protected adoptedCallback(): void {
        this._dispatchAdoptedEvent();
    }

    protected attributeChangedCallback(
        name: string,
        oldValue: string,
        newValue: string
    ): void {
        this.onAttributeChanged(name, oldValue, newValue);
        this._dispatchAttributeChangedEvent(name, oldValue, newValue);
        this._updateComponent();
    }

    protected connectedCallback(): void {
        this.onConnected();
        this._dispatchConnectedEvent();
    }

    protected disconnectedCallback(): void {
        this.onDisconnected();
        this._dispatchDisconnectedEvent();
    }

    private _dispatchAdoptedEvent(): void {
        this.dispatchEvent(new ComponentAdoptedEvent());
    }

    private _dispatchAttributeChangedEvent(
        name: string,
        oldValue: string,
        newValue: string
    ): void {
        this.dispatchEvent(
            new ComponentAttributeChangedEvent({
                attributeName: name,
                newAttributeValue: newValue,
                oldAttributeValue: oldValue
            })
        );
    }

    private _dispatchConnectedEvent(): void {
        this.dispatchEvent(new ComponentConnectedEvent());
    }

    private _dispatchDisconnectedEvent(): void {
        this.dispatchEvent(new ComponentDisconnectedEvent());
    }

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
        this._shadowRoot.appendChild(this.render().toSource());
    }
}
