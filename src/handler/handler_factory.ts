'use strict';

import { Message } from "discord.js/typings/index.js";
import { ChannelHandler } from "./channel_handler";
import { CoinHandler } from "./coin_handler";
import { GetPriceHandler } from "./get_price_handler";
import Handler from "./handler_interface";

class HandlerFactory implements Handler {
    private handlers: Handler[];

    constructor() {
        this.handlers = [
            new GetPriceHandler(),
            new ChannelHandler(),
            new CoinHandler()
        ];
    }

    getCommandName(): string {
        throw new Error("Method not implemented.");
    }

    async execute(message: string[], completeMessage: Message): Promise<string> {
        let mainCommand = message.shift()?.toLowerCase();

        if (mainCommand === 'help') {
            return await this.help();
        }

        for (const handler of this.handlers) {
            if (handler.getCommandName() === mainCommand) {
                return await handler.execute(message, completeMessage);
            }
        }

        return new Promise((resolve, _) => {
            resolve('hmmm.. i can\'t understand what you saying.');
        });
    }

    async help(): Promise<string> {
        let message = 'Here is the list of thing I can do:';

        for (const handler of this.handlers) {
            message += '\n > ' + await handler.help();
        }

        return new Promise((resolve, _) => {
            message += '\n That`s the thing I know';

            resolve(message);
        });
    }
}

export default new HandlerFactory();