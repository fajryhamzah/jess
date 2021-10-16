'use strict';

export default interface Handler {
    getCommandName(): string;
    execute(message: string[]): Promise<string>;
    help(): Promise<string>;
}