const { Router } = require('express');
const Card = require('../model/Card');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, content, type, drawer } = req.body;
    Card
      .create({ name, content, type, drawer })
      .then(card => res.send(card))
      .catch(next);
  })

  //get all cards by Drawer Id
  .get('/drawer/:id', (req, res, next) => {
    Card
      .find({ drawer: req.params.id })
      .then(cards => res.send(cards))
      .catch(next);
  })
  //gets a specific card by Card Id
  .get('/:id', (req, res, next) => {
    Card
      .findById(req.params.id)
      .then(card => res.send(card))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    const { name, content, type } = req.body;
    Card
      .findByIdAndUpdate(req.params.id, { name: name, content: content, type: type }, { new: true })
      .then(card => res.json(card))
      .catch(next);
  })
  //deletes by Card Id
  .delete('/:id', (req, res, next) => {
    Card
      .findOneAndRemove(req.params.id)
      .then(card => res.json(card))
      .catch(next);
  });


