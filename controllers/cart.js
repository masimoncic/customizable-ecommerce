const User = require('../models/users');
const methodOverride = require('method-override');
const Product = require('../models/products');


module.exports.renderCart = async(req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: 'cart',
    populate: {
      path: 'item',
    }
  })
  const cart = user.cart;

  //calculate total and shipping
  shippingPercent = 0.05;
  shippingStatic = 0;
  subTotal = 0;
  cart.forEach(cartItem => {
    subTotal += cartItem.item.price * cartItem.quantity;
  });
  subTotal = Math.round(subTotal * 100) / 100
  const shipping = Math.round(subTotal * shippingPercent * 100) / 100 + shippingStatic;
  const total = Math.round((subTotal + shipping) * 100) /100

  
  res.render('cart/index', {cart, subTotal, shipping, total})
}

module.exports.removeItem = async(req, res) => {
  const user = await User.findById(req.user._id).populate('cart');
  const itemId = req.body.removeItem;
  cart = user.cart;
  await cart.pull({ _id: itemId })
  await user.save();
  res.redirect('/')
}

//shipping - move to utils

