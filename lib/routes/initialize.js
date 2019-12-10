const { Router } = require('express');
const types = require('../utils/typeDefaults');
// const User = require('../model/User');
const Home = require('../model/Home');
const Drawer = require('../model/Drawer');
const Card = require('../model/Card');

module.exports = Router()
  .post('/', async(req, res) => {
    const { title, drawers, cards } = req.body;

    try {
      const homeDoc = await Home
        .create({
          title: title,
          user: req.user._id
        });

      const drawerDocs = await Drawer
        .create(drawers.map(drawer => {
          return {
            name: drawer,
            home: homeDoc.id
          };
        }));

      const cardDocs = await Promise.all(cards.map((cardArray, idx) => {

        return Card
          .create(cardArray.map(card => ({
            name: card.name,
            type: card.type,
            content: types[card.type],
            drawer: drawerDocs[idx]._id
          })));
        
      }));
      
      
      res.send({
        home: homeDoc,
        drawers: drawerDocs,
        cards: cardDocs
      });
    } catch(error) {
      throw new Error(error);
    }
  });
