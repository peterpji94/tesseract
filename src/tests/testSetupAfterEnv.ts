import nock from 'nock';

beforeAll(() => {
  // Prevent accidental HTTP requests during tests
  nock.enableNetConnect('127.0.0.1'); // default supertest address
});
