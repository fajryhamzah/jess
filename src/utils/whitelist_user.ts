'use strict';
import Config from '../app_config';

const config = Config.getConfig();

export default (username:string) => {
    let whitelistUser:string[] = config.getWhitelistUsername();

    return whitelistUser.indexOf(username) > -1;
}