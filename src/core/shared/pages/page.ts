export interface IPage<TPageConfiguration extends Object> {
    activate(config: TPageConfiguration): void;
}
