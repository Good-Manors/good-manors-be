const { Router } = require('express');
const Drawer = require('../model/Drawer');
const hydrate = require('../middleware/hydrate');

module.exports = Router()

  .post('/', (req, res, next) => {
    const { name, home } = req.body;
    Drawer
      .create({ name, home })
      .then(drawer => hydrate(drawer))
      .then(house => res.send(house))
      .catch(next);
  })

  //use Home Id to get all Drawers for a Home
  .get('/home/:id', (req, res, next) => {
    Drawer
      .find({ home: req.params.id })
      .then(drawers => res.send(drawers))
      .catch(next);
  })

  // This is the Drawer id.
  .get('/:id', (req, res, next) => {
    Drawer
      .findById(req.params.id)
      .then(drawer => res.send(drawer))
      .catch(next);
  })
  
  //Update by Drawer Id
  .put('/:id', (req, res, next) => {
    const { name } = req.body;
    Drawer
      .findByIdAndUpdate(req.params.id, { name: name }, { new: true })
      .then(drawer => hydrate(drawer))
      .then(home => res.json(home))
      .catch(next);
  })

  //Deletes by Drawer Id
  .delete('/:id', (req, res, next) => {
    Drawer
      .findByIdAndRemove(req.params.id)
      .then(drawer => hydrate(drawer))
      .then(house => res.json(house))
      .catch(next);
  });

