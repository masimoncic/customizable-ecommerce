const User = require('../models/users');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    const { email, password } = req.body;
    const username = email;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    res.redirect('/');
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = async (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
}