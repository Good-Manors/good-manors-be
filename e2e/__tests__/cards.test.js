require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
const agent = request.agent(app);
const { dropDatabase } = require('../db');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const User = require('../../lib/model/User');
const Drawer = require('../../lib/model/Drawer');
const Home = require('../../lib/model/Home');
const Card = require('../../lib/model/Card');

describe('Tests the Cards routes', () => {

  beforeAll(()=> {
    connect();
  });

  beforeEach(()=> {
    dropDatabase();
  });
  
  afterAll(()=> {
    return mongoose.connection.close();
  });

  it('Should post a new Card', async() => {
    const user = await User.create({ username: 'test', password: '1234' });
    const homes = await Home.create({ title: 'Test House', user: user._id });
    const drawer = await Drawer.create({ name: 'room', home: homes._id });
    const card = { name: 'card', content: { stuff: '123' }, drawer: drawer._id };

    await agent
      .post('/api/v1/auth/signin')
      .send({ username: 'test', password: '1234' });

    return agent
      .post('/api/v1/cards')
      .send(card)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'card',
          content: { stuff: '123' },
          drawer: expect.any(String),
          __v: 0
        });
      });
  });

  it('Should update a Drawers contents', async() => {
    const user = await User.create({ username: 'test', password: '1234' });
    const homes = await Home.create({ title: 'Test House', user: user._id });
    const drawer = await Drawer.create({ name: 'room', home: homes._id });
    const card = await Card.create({ name: 'card', content: { stuff: '123' }, drawer: drawer._id });
    await agent
      .post('/api/v1/auth/signin')
      .send({ username: 'test', password: '1234' });
    return agent
      .put(`/api/v1/cards/${card._id}`)
      .send({ content: { stuff: '12345' } })
      .expect(200)
      .then(res => {
        expect(res.body.content).toEqual({
          stuff: '12345'
        });
      });
  });

  it('Should get a card by its Id', async() => {
    const user = await User.create({ username: 'test', password: '1234' });
    const homes = await Home.create({ title: 'Test House', user: user._id });
    const drawer = await Drawer.create({ name: 'room', home: homes._id });
    const card = await Card.create({ name: 'card', content: { stuff: '123' }, drawer: drawer._id });
    await agent
      .post('/api/v1/auth/signin')
      .send({ username: 'test', password: '1234' });
    return agent
      .get(`/api/v1/cards/${card._id}`)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(JSON.parse(JSON.stringify(card)));
      });
  });

  it('Should get all the cards in a Drawer', async() => {
    const user = await User.create({ username: 'test', password: '1234' });
    const homes = await Home.create({ title: 'Test House', user: user._id });
    const drawer = await Drawer.create({ name: 'room', home: homes._id });
    const cards = await Card.create({ name: 'card', content: { stuff: '123' }, drawer: drawer._id }, { name: 'card two', content: { stuff: '123' }, drawer: drawer._id });
    await agent
      .post('/api/v1/auth/signin')
      .send({ username: 'test', password: '1234' });
    return agent
      .get(`/api/v1/cards/drawer/${drawer._id}`)
      .expect(200)
      .then(res => {
        const parsedCards = JSON.parse(JSON.stringify(cards));
        expect(res.body).toHaveLength(2);
        parsedCards.forEach(card => {
          expect(res.body).toContainEqual(card);
        });
      });
  });

  it('Should Delete a Card', async() => {
    const user = await User.create({ username: 'test', password: '1234' });
    const homes = await Home.create({ title: 'Test House', user: user._id });
    const drawer = await Drawer.create({ name: 'room', home: homes._id });
    const cards = await Card.create({ name: 'card', content: { stuff: '123' }, drawer: drawer._id }, { name: 'card two', content: { stuff: '123' }, drawer: drawer._id });
    await agent
      .post('/api/v1/auth/signin')
      .send({ username: 'test', password: '1234' });
    return agent
      .delete(`/api/v1/cards/${cards[0]._id}`)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(JSON.parse(JSON.stringify(cards[0])));
      }); 
  });
  
});
