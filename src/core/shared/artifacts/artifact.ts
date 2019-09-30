export interface IArtifact<TSource extends Node> {
    toSource(): TSource;
}
