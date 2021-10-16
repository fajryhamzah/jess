'use strict';

import * as dotenv from 'dotenv';
import { Client, Intents, Message } from 'discord.js';

dotenv.config();
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
  console.log(`There is a new girl in town, an it\`s Jess!`);
});

client.on('error', (e:Error) => {
    console.log(`Error : ` + e);
  });

client.on('messageCreate', (msg:Message) => {
    console.log('message ', msg);
    if (msg.content === 'ping') {
      msg.reply('Pong!');
    }
});

client.login(process.env.CLIENT_TOKEN);