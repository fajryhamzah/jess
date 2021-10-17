'use strict';

import * as dotenv from 'dotenv';
import knex, { Knex } from 'knex';
const dbconfig = require('../knexfile.js');

class AppConfig {
    private static instance: AppConfig;

    private clientToken: string;

    private whitelistUsername: string[];
    
    private liveApiToken: string;

    private environtment: string;

    private constructor() { 
        dotenv.config();
        
        this.clientToken = <string>process.env.CLIENT_TOKEN;
        this.whitelistUsername = process.env.WHITELIST_USERNAME?.split(',') || ['fhaji'];
        this.liveApiToken = <string>process.env.LIVEWATCH_TOKEN;
        this.environtment = <string>process.env.APP_ENV || 'development';
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

    public getDatabaseInstance(): Knex {
        const db = knex(this.environtment.toLowerCase() === 'production' ? dbconfig.production : dbconfig.development);

        return db;
    }

    public static getConfig(): AppConfig {
        if (!AppConfig.instance) {
            AppConfig.instance = new AppConfig();
        }

        return AppConfig.instance;
    }
}

export default AppConfig;