const express = require('express');
const router = express.Router({mergeParams: true});
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync');
const { isAdmin } = require('../middleware')
const admin = require('../controllers/admin')

router.get('/', isAdmin, admin.renderHome)


module.exports = router;