export interface IAppConfig {
  port: number,
}

export interface IMongoConfig {
  url: string,
  port?: number
}

export interface IConfigItems {
  appConfig: IAppConfig,
  mongoConfig: IMongoConfig,
}

export interface IConfig {
  production: IConfigItems,
  development: IConfigItems,
  localhost: IConfigItems
}
