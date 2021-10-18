'use strict';

import { Client, Intents, Message } from 'discord.js';
import isInWhitelist from './utils/whitelist_user';
import Config from './app_config';
import HandlerFactory from './handler/handler_factory';
import onReadyEvent from './event/on_ready_event';

const config = Config.getConfig();
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => onReadyEvent(client));

client.on('error', (e: Error) => {
    console.log(`Error : ` + e);
});

client.on('messageCreate', (msg: Message) => {
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
});

client.login(config.getClientToken());