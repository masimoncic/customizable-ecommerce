const express = require('express');
const router = express.Router({mergeParams: true});
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync');
const { isAdmin } = require('../middleware')
const admin = require('../controllers/admin')

router.get('/', isAdmin, admin.renderHome)

router.route('/categories')
  .get(isAdmin, wrapAsync(admin.renderCategories))
  .post(isAdmin, wrapAsync(admin.addCategory))

router.route('/title')
  .get(isAdmin, wrapAsync(admin.renderTitle))

router.route('/images')
  .get(isAdmin, wrapAsync(admin.renderImages))

router.route('/contact')
  .get(isAdmin, wrapAsync(admin.renderContact))

router.delete('/categories/:category', isAdmin, wrapAsync(admin.deleteCategory))

module.exports = router;