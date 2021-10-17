'use strict';

import { Message } from "discord.js/typings/index.js";

export default interface Handler {
    getCommandName(): string;
    execute(message: string[], completeMessage: Message): Promise<string>;
    help(): Promise<string>;
}