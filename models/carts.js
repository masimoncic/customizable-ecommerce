const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Product',
})

const CartSchema = new mongoose.Schema({
  items: [{
    item: [ItemSchema],
    quantity: Number,
  }]
})

module.exports = mongoose.model('Cart', CartSchema);