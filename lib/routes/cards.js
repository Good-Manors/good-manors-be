const { Router } = require('express');
const Card = require('../model/Card');
const User = require('../model/User');
const ensureAuth = require('../middleware/ensure-auth');


module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const { name, content, type, drawer } = req.body;
    User
      .findOne({ email: req.user.email })
      .then(currentUser => {
        Card
          .create({ name, content, type, drawer, user: currentUser })
          .then(card => res.send(card));
      })
      .catch(next);
  })

  .get('/', ensureAuth, (req, res, next) => {
    Card
      //Reference to User and Drawer?
      .find({ user: req.user.email })
      .then(cards => res.send(cards))
      .catch(next);
  });
