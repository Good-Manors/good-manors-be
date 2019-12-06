const { Schema, model } = require('mongoose');

const schema = new Schema ({

  title: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = model('Home', schema);
