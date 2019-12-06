const { Router } = require('express');
const Home = require('../model/Home');
const User = require('../model/User');
const ensureAuth = require('../middleware/ensure-auth');


module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const { title } = req.body;
    // const { user } =    NEED To Find a ref to User ID
    Home
      .create({ title, user: req.user.id })
      .then(home => res.send(home))
      .catch(next);
  })

  .get('/', ensureAuth, (req, res, next) => {
    Home
    //User reference?
      .find({ user: req.user.email })
      .then(home => res.send(home))
      .catch(next);
  });
