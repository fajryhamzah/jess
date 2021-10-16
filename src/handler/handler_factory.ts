'use strict';

import Handler from "./handler_interface";

class HandlerFactory implements Handler {
    private handlers: Handler[];

    constructor() {
        this.handlers = [];
    }

    getCommandName(): string {
        throw new Error("Method not implemented.");
    }

    execute(message: string[]): string {
        let mainCommand = message.shift()?.toLowerCase();

        if (mainCommand === 'help') {
            return this.help();
        }

        this.handlers.forEach(handler => {
            if (handler.getCommandName() === mainCommand) {
                return handler.execute(message);
            }
        })

        return 'hmmm.. i can\'t understand what you saying.';
    }

    help(): string {
        let message = 'Here is the list of thing I can do:';

        this.handlers.forEach(handler => {
            message += '\n '+ handler.help();
        });

        message += '\n That`s the thing I know';

        return message;
    }
}

export default new HandlerFactory();