import { IArtifact } from '../artifacts/artifact';

export interface IComponent {
    render(): IArtifact<Node>;
}
