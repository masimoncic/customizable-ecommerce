const User = require('../models/users');
const methodOverride = require('method-override');
const Product = require('../models/products');

//shipping - move to utils
// const shippingPercent = 0;
// const shippingStatic = 0;


// calculateShipping = async(req, res, cart, req) => {
//   const user = await User.findById(req.user._id).populate('cart');
//   cart = user.cart;
//   cart.forEach(item => console.log(item.item));
// }

module.exports.renderCart = async(req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: 'cart',
    populate: {
      path: 'item',
    }
  })
  const cart = user.cart;
  //console.log(cart);

  //calculate total and shipping
  shippingPercent = 0.05;
  shippingStatic = 0;
  subTotal = 0;
  cart.forEach(cartItem => {
    console.log(cartItem.item.price, cartItem.quantity)
    subTotal += cartItem.item.price * cartItem.quantity;
  });
  subTotal = Math.round(subTotal * 100) / 100
  const shipping = Math.round(subTotal * shippingPercent * 100) / 100 + shippingStatic;
  const total = Math.round((subTotal + shipping) * 100) /100
  console.log(subTotal, shipping, total);


  res.render('cart/index', {cart, subTotal, shipping, total})
}

module.exports.removeItem = async(req, res) => {
  //to do:
  const user = await User.findById(req.user._id).populate('cart');
  const itemId = req.body.removeItem;
  console.log(req.body);
  cart = user.cart;
  console.log(cart);
  console.log(itemId);
  //console.log(req.body)
  await cart.pull({ _id: itemId })
  await user.save();
  res.redirect('/')
}

//shipping - move to utils

