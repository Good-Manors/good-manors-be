require('dotenv').config();
const request = require('../request');
const { dropCollection } = require('../db');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const signUpUser = require('../signupUser');

jest.mock('../../lib/middleware/ensure-auth');

describe('Tests the Homes route', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    return dropCollection('homes');
  });
  beforeEach(() => {
    return dropCollection('users');
  });
  beforeEach(() => {
    signUpUser();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });


  it('Should post a new Home', () => {
    const home = { title: 'Test House' };

    return request
      .post('/api/v1/homes')
      .send(home)
      .expect(200)
      .then(res => {
        expect(res).toEqual({

        });
      });

  });

});
