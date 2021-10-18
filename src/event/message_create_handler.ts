import { Client, Message } from "discord.js";
import isInWhitelist from '../utils/whitelist_user';
import HandlerFactory from '../handler/handler_factory';

const event = (msg: Message, client: Client) => {
    let senderUsername = msg.author.username;
    let jessId = <string>client.user?.id;

    if (client.user?.username === senderUsername || !msg.mentions.members?.has(jessId)) {
        return;
    }

    if (!isInWhitelist(senderUsername)) {
        msg.channel.send('I only obey instruction from my papa!');
    }

    let message = msg.content.split(' ');
    message.shift();

    HandlerFactory.execute(message, msg).then(reply => {
        msg.channel.send(reply);
    }).catch(e => {
        console.log('err:' + e);
        msg.channel.send('Something happen, Please check it!');
    });
}

export default event;