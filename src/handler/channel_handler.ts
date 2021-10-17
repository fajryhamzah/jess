import { Message } from "discord.js/typings/index.js";
import Handler from "./handler_interface";
import * as repo from '../notif_channel/repository';

const registerHandler = async (message: Message): Promise<string> => {
    return await repo.addChannel(message.channelId, message.author.username).then(r => {
        return 'Ok, I will give notification in this channel';
    });
}

export class ChannelHandler implements Handler {
    getCommandName(): string {
        return 'channel';
    }

    execute(message: string[], completeMessage: Message): Promise<string> {
        const mainCommand = message.shift()?.toLowerCase();

        if (mainCommand === 'register') {
            return registerHandler(completeMessage);
        }


        return new Promise((resolve, _) => {
            resolve('wait, what do you want me todo with this channel?');
        });
    }

    help(): Promise<string> {
        throw new Error("Method not implemented.");
    }

}