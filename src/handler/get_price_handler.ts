import Handler from './handler_interface';
import { LiveCoinWatch } from 'livecoinwatch-wrapper-api';
import Config from '../app_config';

let config = Config.getConfig();

export class GetPriceHandler implements Handler {
    getCommandName(): string {
        return 'price';
    }
    execute(message: string[]): Promise<string> {
        let token = message[0].toUpperCase();
        const client = new LiveCoinWatch(config.getLiveAPIToken());

        return client.getCoin('USD', token).then(response => {
            let formatIDR = Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            });

            return token + ' price is ' + formatIDR.format(response.rate);
        });
    }

    help(): Promise<string> {
        return new Promise((resolve, reject) => {
            resolve('**price {COIN_CODE}** : Get coin price from livecoinwatch.com');
        });
    }

}