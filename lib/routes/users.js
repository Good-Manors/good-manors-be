const { Router } = require('express');
const User = require('../model/User');

module.exports = Router()
  .get('/default-home', async(req, res, next) => {
    try {
      const user = await User
        .findById(req.user.id);
      
      res.send({
        home: user.defaultHome
      });
    } catch(e) {
      next(new Error(e));
    }
  })

  .put('/default-home', async(req, res, next) => {
    const { home } = req.body;
    try {
      const user = await User
        .findByIdAndUpdate(req.user.id, { defaultHome: home });

      res.send({
        user: user
      });
    } catch(e) {
      next(new Error(e));
    }
  });

