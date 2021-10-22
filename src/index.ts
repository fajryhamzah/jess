'use strict';

import { Client, Intents, Message } from 'discord.js';
import Config from './app_config';
import onReadyEvent from './event/on_ready_event';
import messageCreateEvent from './event/message_create_handler';

const config = Config.getConfig();
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], retryLimit: 10 });

client.on('ready', () => onReadyEvent(client));

client.on('error', (e: Error) => console.log(`Error : ` + e));

client.on('messageCreate', (msg: Message) => messageCreateEvent(msg, client));

client.login(config.getClientToken());