const { Router } = require('express');
const Home = require('../model/Home');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { title } = req.body;
    // const { user } =    NEED To Find a ref to User ID
    Home
      .create({ title, user: req.user.id })
      .then(home => res.send(home))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Home
    //User reference?
      .find({ user: req.user.id })
      .then(home => res.send(home))
      .catch(next);
  });
