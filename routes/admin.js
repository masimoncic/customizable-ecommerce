const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync');
const { isAdmin } = require('../middleware')
const admin = require('../controllers/admin')
const multer = require("multer");
const { storage } = require('../cloudinary/index')
const upload = multer({ storage });

router.get('/', isAdmin, admin.renderHome)

router.route('/categories')
  .get(isAdmin, wrapAsync(admin.renderCategories))
  .post(isAdmin, wrapAsync(admin.addCategory))

router.route('/title')
  .get(isAdmin, wrapAsync(admin.renderTitle))
  .put(isAdmin, wrapAsync(admin.changeTitle))

router.route('/configHome')
  .get(isAdmin, wrapAsync(admin.renderConfigHome))
  .put(isAdmin, upload.single('backgroundImage'), wrapAsync(admin.updateConfigHome))

router.route('/contact')
  .get(isAdmin, wrapAsync(admin.renderContact))
  .put(isAdmin, wrapAsync(admin.updateContact))

router.delete('/categories/:category', isAdmin, wrapAsync(admin.deleteCategory))

module.exports = router;