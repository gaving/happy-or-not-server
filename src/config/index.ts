import { IConfig, IConfigItems } from './interfaces';

const config: IConfig = {
  production: {
    appConfig: {
      port: 3003,
    },
    mongoConfig: {
      url: 'mongodb://localhost/happy'
    },
  },
  development: {
    appConfig: {
      port: 3003,
    },
    mongoConfig: {
      url: 'mongodb://mongo/happy'
    },
  },
  localhost: {
    appConfig: {
      port: 3003,
    },
    mongoConfig: {
      url: 'mongodb://localhost/happy'
    },
  }
};

export default (environ) => {
  return config[environ] || config.localhost;
};
