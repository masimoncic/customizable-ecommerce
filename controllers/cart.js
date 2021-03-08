const User = require('../models/users');

module.exports.renderCart = async(req, res) => {
  const user = await User.findById(req.user._id).populate('cart');
  const items = user.cart;
  res.render('cart/index', { items })
}