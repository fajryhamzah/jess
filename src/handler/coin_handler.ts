import { Message } from "discord.js/typings/index.js";
import Handler from "./handler_interface";
import * as repo from '../coin_list/repository';

const stopHandler = async (coin: string, deletedBy: string): Promise<string> => {
    await repo.removeCoin(coin.toUpperCase(), deletedBy);
    return new Promise((resolve, _) => {
        resolve('OK');
    });
}

const registerHandler = async (message: string[], addedBy: string): Promise<string> => {
    if (message.length < 3) {
        return new Promise((resolve, _) => {
            resolve('I need more detail to do that. Ask me for **help** if you want to know the detail');
        });
    }

    const coin = <string>message.shift()?.toUpperCase();
    const inputThresholdType = <string>message.shift()?.toLowerCase();
    const priceText = <string>message.shift();
    const price = +priceText;

    let thresholdType: number;

    switch (inputThresholdType) {
        case 'under':
            thresholdType = repo.THRESHOLD_TYPE_UNDER;
            break;
        case 'over':
            thresholdType = repo.THRESHOLD_TYPE_UPPER;
            break;
        default:
            return new Promise((resolve, _) => {
                resolve('Wait, you want me to notify when is it under or over the price ?');
            });
    }

    const checkCoin = await repo.findByCoin(coin);

    if (checkCoin.length > 0) {
        await repo.updateCoin(coin, thresholdType, price, addedBy);
    } else {
        await repo.addCoin(coin, thresholdType, price, addedBy);
    }

    return new Promise((resolve, _) => {
        resolve('Alright, I\`m gonna tell you when something happer=n to that coin. ');
    });
}

export class CoinHandler implements Handler {
    getCommandName(): string {
        return 'coin';
    }

    execute(message: string[], completeMessage: Message): Promise<string> {
        const mainCommand = message.shift();

        switch (mainCommand) {
            case 'register':
                return registerHandler(message, completeMessage.author.username);
            case 'stop':
                return stopHandler(<string>message.shift(), completeMessage.author.username);
            default:
                return new Promise((resolve, _) => {
                    resolve('I don\'t undertand');
                });
        }
    }

    help(): Promise<string> {
        let text = '**coin {COMMAND_TYPE}** : Register/Stop coin notification for registered coin.\n';
        text += '> detail:\n';
        text += '> **coin register {COIN_CODE} {under|over} {price} ** : ex ``coin register CAKE under 19``; set notifier for the coin';
        text += '> **coin stop {COIN_CODE} ** : ex ``coin stop CAKE``; stop notifier for the coin';

        return new Promise((resolve, _) => {
            resolve(text);
        });
    }

}