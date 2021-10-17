import { Client, Permissions } from "discord.js";
import * as notifyRepo from '../notif_channel/repository'; 

const isChannelShouldBeNotify = async (channelId: string): Promise<boolean> => {
    const channel = await notifyRepo.findByChannelId(channelId);

    return channel.length > 0;
}

const event = (client: Client) => {
    console.log(`There is a new girl in town, an it\`s Jess!`);
    let jessId = client.user?.id || '';

    client.guilds.cache.map(guild => {
        let jessMemberGuild = guild.members.resolveId(jessId);

        guild.channels.cache.map(async (channel) => {
            if (!channel.isText() || !channel.permissionsFor(jessMemberGuild)?.has([Permissions.FLAGS.SEND_MESSAGES])) {
                return;
            }

            isChannelShouldBeNotify(channel.id);

            try {
                if (await isChannelShouldBeNotify(channel.id)) {
                    await channel.send('It\' Jess');
                }
            } catch (e) {
                console.log('Error on sending message');
            }
        })
    })
}

export default event;