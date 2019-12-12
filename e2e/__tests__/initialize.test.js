require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
const agent = request.agent(app);
const { dropDatabase } = require('../db');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');

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

  const house =
  {
    title: 'This is a test',
    drawers: ['Kitchen', 'Dining'],
    cards: [
      [
        'Appliance',
        'Material',
        'PaintSwatch',
        'Utility',
        'Contact',
        'Plant',
        'Pet'
      ],
      [
        'Appliance',
        'Material',
        'PaintSwatch',
        'Utility',
        'Contact',
        'Plant',
        'Pet'
      ]
    ]
  };

  it('should post an Initial set up Home, with Drawers, and Cards', async () => {
    await agent
      .post('/api/v1/auth/signup')
      .send({ username: 'test', password: '1234' })
      .expect(200);
    await agent
      .get('/api/v1/auth/verify');
    await agent
      .post('/api/v1/initialize')
      .send(house)
      .expect(200);
  });

  it('Should catch Errors', async() => {
    const house2 = {
      cards: [],
    };
    await agent
      .post('/api/v1/auth/signup')
      .send({ username: 'test', password: '1234' })
      .expect(200);
    await agent
      .get('/api/v1/auth/verify');
    const res = await agent
      .post('/api/v1/initialize')
      .send(house2);
    expect(res.status).toEqual(500);
  });
});
