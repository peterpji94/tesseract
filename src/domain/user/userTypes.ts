import type {Logger} from 'pino';

import type {IUserRepository} from './userRepository';

export type UserDomainContext = {
  logger: Logger;
  userRepository: IUserRepository;
};

export type UserDto = {
  id: string;
  email: string;
};
