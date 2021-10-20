import { Channel, Client, GuildChannel, Permissions, TextChannel, ThreadChannel } from "discord.js";
import * as notifyRepo from '../notif_channel/repository';
import cron from 'cron';
import * as coinRepo from '../coin_list/repository';
import { LiveCoinWatch } from 'livecoinwatch-wrapper-api';
import Config from '../app_config';

const isChannelShouldBeNotify = async (channelId: string): Promise<boolean> => {
    const channel = await notifyRepo.findByChannelId(channelId);

    return channel.length > 0;
}

const livecoin = new LiveCoinWatch(Config.getConfig().getLiveAPIToken());

const formatUSD = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const notifier = async (channel: ThreadChannel) => {
    const allCoin = await coinRepo.getAllCoin();

    for (let coin of allCoin) {
        livecoin.getCoin('USD', coin.coin_code, false).then(response => {
            const price = <number>coin.price;
            const thresholdType = <number>coin.threshold_type;
            const coinCode = <string>coin.coin_code.toUpperCase();

            switch (thresholdType) {
                case coinRepo.THRESHOLD_TYPE_UNDER:
                    response.rate < price ? channel.send(coinCode + ' is under ' + formatUSD.format(coin.price) + '. Current Price : ' + formatUSD.format(response.rate)) : null;
                    break;
                case coinRepo.THRESHOLD_TYPE_UPPER:
                    response.rate > price ? channel.send(coinCode + ' is more than ' + formatUSD.format(coin.price) + '. Current Price : ' + formatUSD.format(response.rate)) : null;
                    break;
            }
        }).catch(e => console.log('something happen with live wathcn api', e));
    }
}


const event = (client: Client) => {
    console.log(`There is a new girl in town, an it\`s Jess!`);

    const job = new cron.CronJob('*/5 * * * *', () => {
        console.log('[Executing Job]');
        let jessId = client.user?.id || '';

        client.guilds.cache.map(guild => {
            let jessMemberGuild = guild.members.resolveId(jessId);

            guild.channels.cache.map(async (channel) => {
                if (!channel.isText() || !channel.permissionsFor(jessMemberGuild)?.has([Permissions.FLAGS.SEND_MESSAGES])) {
                    return;
                }

                try {
                    if (await isChannelShouldBeNotify(channel.id)) {
                        console.log('[Job] Notifying '+ channel.name);
                        notifier(channel);
                    }
                } catch (e) {
                    console.log('Error on sending message');
                }
            })
        });
        console.log('[Job Executed]');
    });

    job.start();
}

export default event;