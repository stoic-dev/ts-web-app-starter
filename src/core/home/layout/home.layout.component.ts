import { Component, component, IComponent } from '../../shared/shared.index';
import { HomeLayoutArtifact } from './home.layout.artifact';

@component({
    tagName: 'home-layout-component'
})
export class HomeLayoutComponent extends Component implements IComponent {
    public render(): HomeLayoutArtifact {
        return new HomeLayoutArtifact();
    }
}
