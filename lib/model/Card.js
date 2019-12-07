const { Schema, model } = require('mongoose');

const schema = new Schema ({

  name: {
    type: String,
    required: true
  },
  content: {
    type: Object
  },
  type: {
    type: String,
    enum: ['Appliance', 'Plant', 'Structure', 'Material', 'Plant', 'Pet', 'Contact', 'Paint Swatch', 'Utility']
  },
  drawer: {
    type: Schema.Types.ObjectId,
    ref: 'Drawer'
  }
});

module.exports = model('Card', schema);
