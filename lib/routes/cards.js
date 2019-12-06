const { Router } = require('express');
const Card = require('../model/Card');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, content, type, drawer } = req.body;
    Card
      .create({ name, content, type, drawer, user: req.user._id })
      .then(card => res.send(card))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Card
      //Reference to User and Drawer?
      .find({ user, drawer })
      .then(cards => res.send(cards))
      .catch(next);
  });
