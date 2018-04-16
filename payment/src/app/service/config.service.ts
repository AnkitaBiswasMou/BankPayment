import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    public current: IConfig;

    constructor() {
        const env = this.getEnvironmentName();
        this.current = this.getConfigForEnvironment(env);
    }

    public getEnvironmentName() {
        return window.location.host;
    }
    public getConfigForEnvironment(env: string): IConfig {
        const localhostConfig: IConfig = {
            baseUrl: 'http://localhost:4894/api/payment'
        };
        const envConfigs = {
            'localhost:4200': localhostConfig
        };
        const config = envConfigs[env];
            return config;
    }
}

export class IConfig {
    baseUrl: string;
}
