const connect = require('../lib/utils/connect');
const MONGODB_URI = global.__MONGO_URI__;
const mongoose = require('mongoose');

beforeAll(() => {
  return connect(MONGODB_URI, { log: false });
});

afterAll(() => {
  return mongoose.connection.close();
});
