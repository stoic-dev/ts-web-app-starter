export interface IInitializationPort<TResult = void> {
    initialize(): TResult;
}
