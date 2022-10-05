const supertest = require('supertest');
const app = require('./src/app');

beforeAll(() => {
  global.request = supertest(app);
});
