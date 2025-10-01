import {User} from './User';

const VALID_UUID_V7 = '0199a087-9432-764e-b7b3-0b29bf167804';
const VALID_EMAIL = 'foo@bar.com';

describe('class User', () => {
  it('should create a valid User instance', () => {
    const validUser = {id: VALID_UUID_V7, email: VALID_EMAIL};

    const user = new User(validUser);

    expect(user).toBeInstanceOf(User);
    expect(user.toDto()).toEqual(validUser);
  });

  it('should throw an error for invalid UUID', () => {
    const invalidUser = {id: 'invalid-uuid', email: VALID_EMAIL};

    expect(() => new User(invalidUser)).toThrow();
  });

  it('should throw an error for invalid email', () => {
    const invalidUser = {id: VALID_UUID_V7, email: 'invalid-email'};

    expect(() => new User(invalidUser)).toThrow();
  });
});
