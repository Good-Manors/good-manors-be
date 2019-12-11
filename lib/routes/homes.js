const { Router } = require('express');
const Home = require('../model/Home');
const hydrate = require('../middleware/hydrate');


module.exports = Router()

  .post('/', (req, res, next) => {
    const { title } = req.body;
    Home
      .create({ title, user: req.user._id })
      .then(home => res.send(home))
      .catch(next);
  })

  //Get all Homes for a user by user Id
  .get('/user/:id', (req, res, next) => {
    Home
      .find({ user: req.params.id })
      .then(home => hydrate(home))
      .then(home => res.send(home))
      .catch(next);
  })

  //Get a home by Id
  .get('/:id', (req, res, next) => {
    Home
      .findById(req.params.id)
      .then(home => hydrate(home))
      .then(home => res.send(home))
      .catch(next);
  })

  //Update by Id
  .put('/:id', (req, res, next) => {
    const { title } = req.body;
    Home.findByIdAndUpdate(req.params.id, { title: title }, { new: true })
      .then(home => res.json(home))
      .catch(next);
  })

  //Delete by Id
  .delete('/:id', (req, res, next) => {
    Home.findByIdAndRemove(req.params.id)
      .then(home => res.json(home))
      .catch(next);
  });


