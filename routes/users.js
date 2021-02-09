const express = require('express');
const router = express.Router({mergeParams: true});
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync');

const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister)
    .post(wrapAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),
         wrapAsync(users.login))


router.get('/logout', users.logout)


module.exports = router;