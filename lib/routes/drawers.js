const { Router } = require('express');
const Drawer = require('../model/Drawer');

module.exports = Router()

  .post('/', (req, res, next) => {
    const { name, home } = req.body;
    Drawer
      .create({ name, home })
      .then(drawer => res.send(drawer))
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
      .then(drawer => res.json(drawer))
      .catch(next);
  })
  //Deletes by Drawer Id
  .delete('/:id', (req, res, next) => {
    Drawer
      .findByIdAndRemove(req.params.id)
      .then(drawer => res.json(drawer))
      .catch(next);
  });

