import pino from 'pino';
import {Sequelize} from 'sequelize';
import supertest from 'supertest';

import {UserRepository} from '../domain/user/userRepository';
import {constructServer} from '../infrastructure/server';

export async function constructTestContext() {
  const logger = pino({level: process.env.LOG_LEVEL || 'silent'});

  const sequelize = new Sequelize('sqlite::memory:', {logging: false});
  const userRepository = new UserRepository(sequelize);
  await sequelize.sync();

  const testContext = {logger, userRepository};
  const httpServer = constructServer(testContext);
  const requestWithSupertest = supertest.agent(httpServer);

  return {requestWithSupertest, logger, userRepository};
}
