export interface ILogMessage {
    readonly subject: string;
    readonly body: string;
    readonly tags: Array<string>;
    readonly timestamp: Date;
    readonly trace?: string;
}
