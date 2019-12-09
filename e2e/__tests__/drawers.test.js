require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
const { dropDatabase } = require('../db');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const User = require('../../lib/model/User');
const agent = request.agent(app);
const Drawer = require('../../lib/model/Drawer');

describe('Tests the Drawers routes', () => {
  it('Should Create a new Drawer', () => {
    const drawer = {};

    
  });








});
