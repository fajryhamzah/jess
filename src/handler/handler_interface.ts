'use strict';

export default interface Handler {
    getCommandName(): string;
    execute(message: string[]): string;
    help(): string;
}