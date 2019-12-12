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

  const house = {
    title: 'My House!',
    drawers: [
      {
        name: 'Kitchen',
        cards: [
          {
            name: 'Refridgerator',
            type: 'Appliance',
            content: [['text', 'I purchased this fridge from our neighbor Jeff. Got it for a great price...no regrets'], ['image', 'http://localhost:7890/src/assets/good-manors-logo.png'], ['key-value', ['Brand', 'Samsung']], ['key-value', ['Model #', 'RF28R7551SG']], ['log', ['Purchased: 12/12/96', 'Serviced: 12/12/98', 'Serviced: 12/10/08']]]
          },
          { name: 'Oven', type: 'Appliance', content: [['log', ['a', 'b', 'c']], ['text', 'another text entry']] }
        ]
      },
      {
        name: 'Exterior',
        cards: [
          { name: 'Oak Tree', type: 'Plant', content: [['key-value', ['species', 'red oak']], ['text', 'planted in 1998']] },
          { name: 'Deck Color', type: 'Paint Swatch', content: [['key-value', ['brand', 'Benjamin Moore']], ['key-value', ['color', 'Lime Green']]] }
        ]
      }
    ]
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
      .then(async() => {
        await agent
          .post('/api/v1/initialize')
          .send(house)
          .then(res => {
            console.log(res.body);
          })
          .expect(200);
      });
  });
});
