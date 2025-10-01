import {Logger} from 'pino';

import type {IUserRepository} from './domain/user/userRepository';

export type AppContext = {
  logger: Logger;
  userRepository: IUserRepository;
};

export class ClientError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
