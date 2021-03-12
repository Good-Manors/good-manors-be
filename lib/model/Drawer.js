const { Schema, model } = require('mongoose');

const schema = new Schema ({

  name: {
    type: String,
    required: true
  },
  home: {
    type: Schema.Types.ObjectId,
    ref: 'Home'
  }
});

module.exports = model('Drawer', schema);
