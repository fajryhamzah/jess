'use strict';

import * as dotenv from 'dotenv';

class AppConfig {
    private static instance: AppConfig;

    private clientToken: string;

    private whitelistUsername: string[];
    
    private liveApiToken: string;

    private constructor() { 
        dotenv.config();
        
        this.clientToken = <string>process.env.CLIENT_TOKEN;
        this.whitelistUsername = process.env.WHITELIST_USERNAME?.split(',') || ['fhaji'];
        this.liveApiToken = <string>process.env.LIVEWATCH_TOKEN;
    }

    public getClientToken(): string {
        return this.clientToken;
    }

    public getWhitelistUsername(): string[] {
        return this.whitelistUsername;
    }

    public getLiveAPIToken(): string {
        return this.liveApiToken;
    }

    public static getConfig(): AppConfig {
        if (!AppConfig.instance) {
            AppConfig.instance = new AppConfig();
        }

        return AppConfig.instance;
    }
}

export default AppConfig;