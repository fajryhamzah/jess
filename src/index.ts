'use strict';

import { Client, Intents, Message, Permissions, TextChannel } from 'discord.js';
import isInWhitelist from './utils/whitelist-user';
import Config from './app-config';

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
                console.log('Error on sending message', e);
            }
        })
    })

});

client.on('error', (e: Error) => {
    console.log(`Error : ` + e);
});

client.on('messageCreate', (msg: Message) => {
    console.log('message ', msg);

    let senderUsername = msg.author.username;

    if (client.user?.username === senderUsername) {
        return;
    }

    if (!isInWhitelist(senderUsername)) {
        msg.channel.send('I only obey instruction from my papa!');
    }


    msg.channel.send(msg.content);
});

client.login(config.getClientToken());