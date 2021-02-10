

module.exports.isAdmin = (req, res, next) => {
    if(!req.user.admin === true) {
        req.flash('error', 'You do not have permission to do that')
        return res.redirect('/');
    }
    next();
}

