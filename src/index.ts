'use strict';

import { Client, Intents, Message, Permissions, TextChannel } from 'discord.js';
import isInWhitelist from './utils/whitelist_user';
import Config from './app_config';
import HandlerFactory from './handler/handler_factory';

const config = Config.getConfig();
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
    console.log(`There is a new girl in town, an it\`s Jess!`);
    let jessId = client.user?.id || '';

    client.guilds.cache.map(guild => {
        let jessMemberGuild = guild.members.resolveId(jessId);

        guild.channels.cache.map(async (channel) => {
            if (!channel.isText() || !channel.permissionsFor(jessMemberGuild)?.has([Permissions.FLAGS.SEND_MESSAGES])) {
                return;
            }

            try {
                await channel.send('It\' Jess');
            } catch (e) {
                console.log('Error on sending message');
            }
        })
    })

});

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

    HandlerFactory.execute(message).then(reply => {
        msg.channel.send(reply);
    });
});

client.login(config.getClientToken());