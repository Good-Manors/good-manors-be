const mongoose = require('mongoose');

module.exports = {   
  dropDatabase() {
    return mongoose.connection.dropDatabase();
  }
};
