require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
const { dropDatabase } = require('../db');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const User = require('../../lib/model/User');
const agent = request.agent(app);
const Home = require('../../lib/model/Home');


describe('Tests the Homes route', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });


  it('Should post a new Home', async() => {
    const home = { title: 'Test House' };

    await User.create({ username: 'test', password: '1234' });
    await agent
      .post('/api/v1/auth/signin')
      .send({ username: 'test', password: '1234' });
    return agent
      .post('/api/v1/homes')
      .send(home)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          title: 'Test House',
          user: expect.any(String)
        });
      });
  });

  it('Should get all homes for a user', async() => {
    const user1 = await User.create({ username: 'test', password: '1234' });
    const homes = await Home.create([{ title: 'Test House', user: user1._id }, { title: 'Test House2', user: user1._id }]);
    await agent
      .post('/api/v1/auth/signin')
      .send({ username: 'test', password: '1234' });
  
    return agent
      .get(`/api/v1/homes/user/${user1._id}`)
      .expect(200)
      .then(res => {
        const parsedHomes = JSON.parse(JSON.stringify(homes));
        expect(res.body).toHaveLength(2);   
        parsedHomes.forEach(home => {
          expect(res.body).toContainEqual(home);
        });
      });
  });

  it('Should delete a Home', async() => {
    const user1 = await User.create({ username: 'test', password: '1234' });
    const homes = await Home.create([{ title: 'Test House', user: user1._id }, { title: 'Test House2', user: user1._id }]);
    await agent
      .post('/api/v1/auth/signin')
      .send({ username: 'test', password: '1234' });
    return agent
      .delete(`/api/v1/homes/${homes[0]._id}`)
      .then(res => {
        expect(res.body).toEqual(JSON.parse(JSON.stringify(homes[0])));
      });
  });

  it('Should Update a Home', async() => {
    const user1 = await User.create({ username: 'test', password: '1234' });
    const homes = await Home.create([{ title: 'Test House', user: user1._id }, { title: 'Test House2', user: user1._id }]);
    await agent
      .post('/api/v1/auth/signin')
      .send({ username: 'test', password: '1234' });
    return agent
      .put(`/api/v1/homes/${homes[0]._id}`)
      .send({ title: 'Updated Title' })
      .then(res => {
        expect(res.body.title).toEqual('Updated Title');
      });
  });

  it('Should get one home from its Id', async() => {
    const user1 = await User.create({ username: 'test', password: '1234' });
    const homes = await Home.create([{ title: 'Test House', user: user1._id }, { title: 'Test House2', user: user1._id }]);
    await agent
      .post('/api/v1/auth/signin')
      .send({ username: 'test', password: '1234' });
    return agent
      .get(`/api/v1/homes/${homes[0]._id}`)
      .expect(200)
      .then(res => {
        expect(res.body._id).toEqual(JSON.parse(JSON.stringify(homes[0]._id)));
      });
  });

});
