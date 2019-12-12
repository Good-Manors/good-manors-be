require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
const agent = request.agent(app);
const { dropDatabase } = require('../db');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const User = require('../../lib/model/User');
const Home = require('../../lib/model/Home');
const Drawer = require('../../lib/model/Drawer');
const Card = require('../../lib/model/Card');

describe('Tests the Initialize route', () => {

  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    dropDatabase();

  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  // const homes = await Home.create({ title: 'Test House', user: user._id });
  // const drawer = await Drawer.create({ name: 'room', home: homes._id });
  // const card = { name: 'card', type: 'Appliance', content: ['text', '123'], drawer: drawer._id };

  const house = {
    title: 'My House!',
    drawers: [{ name: 'room' }],
    cards: [{ name: 'card', type: 'Appliance', content: ['text', '123'] }]
  };

  it.only('should post an Initial set up Home, with Drawers, and Cards', () => {
    // await User.create({ username: 'test', password: '1234' });
    // await agent
    //   .post('/api/v1/auth/signin')
    //   .send({ username: 'test', password: '1234' });
    return agent
      .post('/api/v1/auth/signup')
      .send({ username: 'test', password: '1234' })
      .expect(200)
      .then(() => {
        return agent
          .get('/api/v1/auth/verify')
          .then(res => {
            console.log(res.body);
          });
      })
      .then(async() => {
        await agent
          .post('/api/v1/initialize', house)
          // .send(house)
          .then(res => {
            console.log(res.body);
          })
          .expect(200);
      });
  });
});
