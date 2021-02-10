const User = require('./models/users')
const ExpressError = require('./utils/ExpressError')

module.exports.isAdmin = (req, res, next) => {
    if(!req.user || !req.user.admin === true) {
        req.flash('error', 'You do not have permission to do that')
        return res.redirect('/');
    }
    next();
}

