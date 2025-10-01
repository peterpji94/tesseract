import {constructTestContext} from '../../tests/testUtils';

const INVALID_EMAIL = 'foobar.com';
const VALID_EMAIL = 'foo@bar.com';
const VALID_EMAIL_2 = 'foo2@bar.com';

describe('user routes', () => {
  describe('POST user', () => {
    it('responds with the user', async () => {
      const {requestWithSupertest} = await constructTestContext();
      const res = await requestWithSupertest.post('/users').send({email: VALID_EMAIL});

      expect(res.status).toEqual(201);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body).toEqual(expect.objectContaining({email: VALID_EMAIL}));
      expect(res.body.id).toBeDefined();
    });

    it('responds with 400 if the email already exists', async () => {
      const {requestWithSupertest} = await constructTestContext();
      await requestWithSupertest.post('/users').send({email: VALID_EMAIL});
      const res = await requestWithSupertest.post('/users').send({email: VALID_EMAIL});

      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body).toEqual({error: 'User already exists'});
    });

    it('responds with 400 with invalid email', async () => {
      const {requestWithSupertest} = await constructTestContext();
      const res = await requestWithSupertest.post('/users').send({email: INVALID_EMAIL});

      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body).toEqual({error: '"email" must be a valid email'});
    });
  });

  describe('GET user', () => {
    it('responds with an empty list', async () => {
      const {requestWithSupertest} = await constructTestContext();

      const getRes = await requestWithSupertest.get(`/users`);

      expect(getRes.status).toEqual(200);
      expect(getRes.type).toEqual(expect.stringContaining('json'));
      expect(getRes.body.length).toEqual(0);
    });

    it('responds with the user', async () => {
      const {requestWithSupertest} = await constructTestContext();
      const postRes = await requestWithSupertest.post('/users').send({email: VALID_EMAIL});
      const userId = postRes.body.id;

      const getRes = await requestWithSupertest.get(`/users`);

      expect(getRes.status).toEqual(200);
      expect(getRes.type).toEqual(expect.stringContaining('json'));
      expect(getRes.body.length).toEqual(1);
      expect(getRes.body[0]).toEqual({email: VALID_EMAIL, id: userId});
    });

    it('responds with two users', async () => {
      const {requestWithSupertest} = await constructTestContext();
      await requestWithSupertest.post('/users').send({email: VALID_EMAIL});
      await requestWithSupertest.post('/users').send({email: VALID_EMAIL_2});

      const getRes = await requestWithSupertest.get(`/users`);

      expect(getRes.status).toEqual(200);
      expect(getRes.type).toEqual(expect.stringContaining('json'));
      expect(getRes.body.length).toEqual(2);
    });
  });
});
