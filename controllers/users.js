const User = require('../models/users');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const admin = false;
        const user = new User({ email, username, admin });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) {
                return next(err);
            }
            req.flash('success', 'Successfully Signed Up')
        })
        res.redirect('/');
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = async (req, res, next) => {
    console.log(req.body);
    console.log(req.session);
    console.log(req.user);
    res.redirect('/');
}