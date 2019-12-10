const Home = require('../model/Home');
const Drawer = require('../model/Drawer');
const Card = require('../model/Card');

module.exports = async(input) => {
  let parentHome;
  //input is a card {go get drawer, then get home}
  if(input.drawer) {
    const parentDrawer = await Drawer.findById(input.drawer);
    parentHome = await Home.findById(parentDrawer.home);
  }
  //input is a drawer {go get home}
  if(input.home) {
    parentHome = await Home.findById(input.home);
  }
  //input is a home 
  if(input.user) {
    parentHome = input;
  }

  const returnObj = {
    home: parentHome
  };

  returnObj.drawers = await Drawer
    .find({ home: parentHome._id });

  returnObj.cards = await Promise.all(returnObj.drawers.map(drawer => {
    return Card
      .find({ drawer: drawer._id });
  }));

  return returnObj;
};
