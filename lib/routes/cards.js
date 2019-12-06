const { Router } = require('express');
const Card = require('../model/Card');
const Drawer = require('../model/Drawer');


module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, content, type, drawer } = req.body;
    const currentUser = req.user.email;
    Card
      .create({ name, content, type, drawer, user: currentUser })
      .then(card => res.send(card))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Drawer
      .findById(drawer)
      .populate('Cards')
      .then(cards => {
        Card
          //Reference to User and Drawer?
          .find({ user: req.user.email })
          .then(cards => res.send(cards))
          .catch(next);
      });
  });
