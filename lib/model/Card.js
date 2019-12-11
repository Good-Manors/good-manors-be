const { Schema, model } = require('mongoose');

const schema = new Schema ({

  name: {
    type: String,
  },
  content: {
    type: Array
  },
  type: {
    type: String,
    enum: ['Appliance', 'Material', 'Plant', 'Pet', 'Contact', 'PaintSwatch', 'Utility']
  },
  drawer: {
    type: Schema.Types.ObjectId,
    ref: 'Drawer'
  }
});

module.exports = model('Card', schema);
