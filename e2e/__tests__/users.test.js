require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
const agent = request.agent(app);
const { dropDatabase } = require('../db');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const User = require('../../lib/model/User');
const Home = require('../../lib/model/Home');

describe('Tests the Users route for default Home', () => {

  beforeAll(async()=> {
    await connect();
  });

  beforeEach(async()=> {
    await dropDatabase();
  });
  
  afterAll(()=> {
    return mongoose.connection.close();
  });

  it('Sets a Users default Home', async() => {
    const user = await User.create({ username: 'test', password: '1234' });
    const house = await Home.create({ title: 'Test House', user: user._id });

    await agent
      .post('/api/v1/auth/signin')
      .send({ username: 'test', password: '1234' })
      .expect(200);
    const res = await agent
      .put('/api/v1/users/default-home')
      .send({ home: house._id })
      .expect(200);
    expect(res.body.user.defaultHome).toEqual(JSON.parse(JSON.stringify(house._id)));

  });

  it('Returns a Users default Home', async() => {
    const user = await User.create({ username: 'test', password: '1234' });
    const house = await Home.create({ title: 'Test House', user: user._id });

    await agent
      .post('/api/v1/auth/signin')
      .send({ username: 'test', password: '1234' });
    await agent
      .put('/api/v1/users/default-home')
      .send({ home: house._id });
    const res = await agent
      .get('/api/v1/users/default-home');
    expect(res.body).toEqual(JSON.parse(JSON.stringify({ home: house._id })));
  });

  it('Error Checking', async() => {
    const res1 = await agent
      .get('/api/v1/users/default-home');
    expect(res1.status).toBe(500);
    const res = await agent
      .put('/api/v1/users/default-home');
    expect(res.status).toEqual(500);
  });
  
});
