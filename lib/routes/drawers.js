const { Router } = require('express');
const Drawer = require('../model/Drawer');
const Home = require('../model/Home');

module.exports = Router()

  .post('/', (req, res, next) => {
    const { name, home } = req.body;
    Drawer
      .create({ name, home })
      .then(drawer => res.send(drawer))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Home
      .findById(req.body.home)
      .then(drawers => 

      })
  })