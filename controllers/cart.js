const User = require('../models/users');

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