'use strict';

import * as dotenv from 'dotenv';

class AppConfig {
    private static instance: AppConfig;

    private clientToken: string;

    private whitelistUsername: string[];

    private constructor() { 
        dotenv.config();
        
        this.clientToken = <string>process.env.CLIENT_TOKEN;
        this.whitelistUsername = process.env.WHITELIST_USERNAME?.split(',') || ['fhaji'];
    }

    public getClientToken(): string {
        return this.clientToken;
    }

    public getWhitelistUsername(): string[] {
        return this.whitelistUsername;
    }

    public static getConfig(): AppConfig {
        if (!AppConfig.instance) {
            AppConfig.instance = new AppConfig();
        }

        return AppConfig.instance;
    }
}

export default AppConfig;