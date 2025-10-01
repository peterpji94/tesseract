import {Logger} from 'pino';
import {Sequelize} from 'sequelize';

import {Env} from './env';

export async function connectDb(env: Env, logger: Logger) {
  const sequelize = new Sequelize(env.postgres.database, env.postgres.user, env.postgres.password, {
    host: env.postgres.host,
    port: Number(env.postgres.port),
    dialect: 'postgres',
    logging: false,
  });

  try {
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    throw error;
  }

  return sequelize;
}
