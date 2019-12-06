const { Schema, model } = require('mongoose');

const schema = new Schema({
  default: {
    type: Schema.Types.ObjectId,
    ref: 'Home'
  },
  email: {
    type: String,
    required: true
  }

});

module.exports = model('User', schema);
