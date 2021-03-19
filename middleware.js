const User = require('./models/users');
const ExpressError = require('./utils/ExpressError');
const { productSchema, reviewSchema } = require('./joiSchemas');

//authorization

module.exports.isAdmin = (req, res, next) => {
    if(!req.user || !req.user.admin === true) {
        req.flash('error', 'You do not have permission to do that')
        return res.redirect('/');
    }
    next();
}

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in.')
        return res.redirect('/users/login');
    }
    next();
}

//validation

module.exports.validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body.product);
  if(error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  }
  else{
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body.review);
  if(error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  }
  else{
    next();
  }
};