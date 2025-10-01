import Joi from 'joi';

import {UserDto} from './userTypes';

export class User implements UserDto {
  id: string;
  email: string;
  constructor(user: UserDto) {
    this.id = user.id;
    this.email = user.email;
    this.validate();
  }

  toDto(): UserDto {
    return {id: this.id, email: this.email};
  }

  private validate() {
    const dto = this.toDto();
    const result = userSchema.validate(dto);
    if (result.error) throw result.error;
  }
}

export const userSchema = Joi.object({
  id: Joi.string().uuid({version: 'uuidv7'}).required(),
  email: Joi.string().email().required(),
});
