const { Router } = require('express');
const Home = require('../model/Home');

module.exports = Router()

  .post('/', (req, res, next) => {
    const { title } = req.body;
    Home
      .create({ title, user: req.user._id })
      .then(home => res.send(home))
      .catch(next);
  })

  //Get all Homes for a user
  .get('/', (req, res, next) => {
    Home
      .find({ user: req.user._id })
      .then(homes => res.send(homes))
      .catch(next);
  })

  //Get a home by Id
  .get('/:id', (req, res, next) => {
    Home
      .findById({ user: req.user._id, id: req.body.id })
      .then(home => res.send(home))
      .catch(next);
  })

  //Update by Id
  .put('/:id', (req, res, next) => {
    Home.findByIdAndUpdate(req.params.id, /*update*/)
      .then(home => res.json(home))
      .catch(next);
  })

  //Delete by Id
  .delete('/:id', (req, res, next) => {
    Home.findByIdAndRemove(req.params.id)
      .then(home => res.json(home))
      .catch(next);
  });

//Put and Delete

