const { Schema, model } = require('mongoose');

const Order = new Schema({
  vendorCode: {
    type: Number,
    required: true,
  },
  dates: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  work: {
    type: Schema.Types.ObjectId,
    ref: 'Works',
  }
});

module.exports = model('Orders', Order);
