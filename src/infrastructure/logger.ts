import pino from 'pino';

import {Env} from './env';

export function constructLogger(env: Env) {
  return pino({
    level: env.logLevel || 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    },
  });
}
