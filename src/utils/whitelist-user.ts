'use strict';

export default (username:string) => {
    let whitelistUser:string[] = process.env.WHITELIST_USERNAME?.split(',') || ['fhaji'];
    console.log(whitelistUser);
    return whitelistUser.indexOf(username) > -1;
}