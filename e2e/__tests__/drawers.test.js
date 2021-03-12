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


describe('Tests the Drawers routes', () => {

  beforeAll(async()=> {
    await connect();
  });
  beforeEach(async()=> {
    await dropDatabase();
  });
  afterAll(()=> {
    return mongoose.connection.close();
  });

  it('Should Create a new Drawer', async() => {
    const user = await User.create({ username: 'test', password: '1234' });
    const homes = await Home.create({ title: 'Test House', user: user._id });
    const drawer = { name: 'room', home: homes._id };
    await agent
      .post('/api/v1/auth/signin')
      .send({ username: 'test', password: '1234' });
    return agent
      .post('/api/v1/drawers')
      .send(drawer)
      .expect(200)
      .then(res => {
        expect(res.body.drawers).toEqual([{
          _id: expect.any(String),
          name: 'room',
          home: expect.any(String),
          __v: 0
        }]);
      });
  });

  it('Should Update a Drawer', async() => {
    const user = await User.create({ username: 'test', password: '1234' });
    const homes = await Home.create({ title: 'Test House', user: user._id });
    const drawer = await Drawer.create({ name: 'room', home: homes._id });
    await agent
      .post('/api/v1/auth/signin')
      .send({ username: 'test', password: '1234' });
    return agent
      .put(`/api/v1/drawers/${drawer._id}`)
      .send({ name: 'updated room' })
      .then(res => {
        expect(res.body.drawers[0].name).toEqual('updated room');
      });
  });

  it('Should get all drawers for a home', async() => {
    const user = await User.create({ username: 'test', password: '1234' });
    const homes = await Home.create({ title: 'Test House', user: user._id });
    const drawers = await Drawer.create([{ name: 'room', home: homes._id }, { name: 'room two', home: homes._id }]);
    await agent
      .post('/api/v1/auth/signin')
      .send({ username: 'test', password: '1234' });
    return agent
      .get(`/api/v1/drawers/home/${homes._id}`)
      .expect(200)
      .then(res => {
        const parsedDrawers = JSON.parse(JSON.stringify(drawers));
        expect(res.body).toHaveLength(2);
        parsedDrawers.forEach(drawer => {
          expect(res.body).toContainEqual(drawer);
        });
      });
  });

  it('Should get a drawer by its Id', async() => {
    const user = await User.create({ username: 'test', password: '1234' });
    const homes = await Home.create({ title: 'Test House', user: user._id });
    const drawers = await Drawer.create([{ name: 'room', home: homes._id }, { name: 'room two', home: homes._id }]);
    await agent
      .post('/api/v1/auth/signin')
      .send({ username: 'test', password: '1234' });
    return agent
      .get(`/api/v1/drawers/${drawers[0]._id}`)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(JSON.parse(JSON.stringify(drawers[0])));
      });
  });

  it('Should Delete a drawer', async() => {
    const user = await User.create({ username: 'test', password: '1234' });
    const homes = await Home.create({ title: 'Test House', user: user._id });
    const drawers = await Drawer.create([{ name: 'room', home: homes._id }, { name: 'room two', home: homes._id }]);
    await agent
      .post('/api/v1/auth/signin')
      .send({ username: 'test', password: '1234' });
    return agent
      .delete(`/api/v1/drawers/${drawers[0]._id}`)
      .then(res => {
        expect(res.body.drawers).toEqual([JSON.parse(JSON.stringify(drawers[1]))]);
      });
    
  });




});
