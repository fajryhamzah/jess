'use strict';
import Config from '../app-config';

const config = Config.getConfig();

export default (username:string) => {
    let whitelistUser:string[] = config.getWhitelistUsername();
    console.log(whitelistUser);
    return whitelistUser.indexOf(username) > -1;
}