const User = require('./models/users')
const ExpressError = require('./utils/ExpressError')

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