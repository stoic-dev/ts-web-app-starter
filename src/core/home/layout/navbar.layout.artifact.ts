import { IArtifact } from '../../shared/shared.index';

export class NavbarLayoutArtifact implements IArtifact<Node> {
    public toSource(): Node {
        return (new Range().createContextualFragment(`
            <template>
                <style>
                    .navbar-layout {
                        padding: 0;
                        list-style: none;
                        display: flex;
                        justify-content: space-between;
                    }

                    .navbar-layout > li {
                        display: flex;
                    }
                </style>
                <ul class="navbar-layout" role="navigation">
                    <li>
                        <slot name="title"></slot>
                    </li>
                    <li>
                        <slot name="links"></slot>
                    </li>
                    <li>
                        <slot name="user"></slot>
                    </li>
                </ul>
            </template>
        `).firstElementChild as HTMLTemplateElement).content.cloneNode(true);
    }
}
