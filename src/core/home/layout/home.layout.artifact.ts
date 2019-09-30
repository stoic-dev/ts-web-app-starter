import { IArtifact } from '../../shared/shared.index';

export class HomeLayoutArtifact implements IArtifact<Node> {
    public toSource(): Node {
        return (new Range().createContextualFragment(`
        <template>
            <style>
                .home-layout {
                    width: 100vw;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                }

                .home-layout > nav {
                    width: 100vw;
                    height: 5vh;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }

                .home-layout > main {
                    width: 100vw;
                    height: 95vh;
                }

                ::slotted(*) {
                    width: 100%;
                    height: 100%;
                }
            </style>
            <div class="home-layout">
                <nav>
                    <slot name="navbar"></slot>
                </nav>
                <main>
                    <slot name="main"></slot>
                </main>
            </div>
        </template>
    `).firstElementChild as HTMLTemplateElement).content.cloneNode(true);
    }
}
