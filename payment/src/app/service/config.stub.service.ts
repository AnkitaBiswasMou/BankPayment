import { Injectable } from '@angular/core';
import { IConfig } from './config.service';

@Injectable()
export class ConfigStubService {

    public current: IConfig;

    constructor() {
        this.current = Object.assign({
            baseUrl: 'localhost'
        });
    }

    public getEnvironmentName() {
        return 'localhost';
    }
    public getConfigForEnvironment(env: string): IConfig {
        const config: IConfig = new IConfig();
        config.baseUrl = 'localhost';
        return config;
      }
}