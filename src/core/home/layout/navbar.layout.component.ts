import { component, Component, IComponent } from '../../shared/shared.index';
import { NavbarLayoutArtifact } from './navbar.layout.artifact';

@component({tagName: 'navbar-layout-component'})
export class NavbarLayoutComponent extends Component implements IComponent {
    public render(): NavbarLayoutArtifact {
        return new NavbarLayoutArtifact();
    }
}
