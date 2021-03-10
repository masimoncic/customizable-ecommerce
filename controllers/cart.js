const User = require('../models/users');
const methodOverride = require('method-override');

module.exports.renderCart = async(req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: 'cart',
    populate: {
      path: 'item',
    }
  })
  const cart = user.cart
  res.render('cart/index', {cart})
}

module.exports.removeItem = async(req, res) => {
  //to do:
  const user = await User.findById(req.user._id).populate('cart');
  const itemId = req.body.removeitem;
  cart = user.cart;
  //console.log(cart);
  //console.log(req.body)
  //await user.updateOne({$pull: {cart: {id: {itemId}}}})
  res.redirect('/')
}