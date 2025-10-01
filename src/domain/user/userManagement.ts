import {v7 as uuidv7} from 'uuid';

import {User} from './User';
import {UserDomainContext} from './userTypes';

export async function createUser(email: string, context: UserDomainContext) {
  const {logger, userRepository} = context;
  const user = new User({id: uuidv7(), email});
  await userRepository.create(user);
  logger.info({createdUserId: user.id}, `User created`);
  return user.toDto();
}
