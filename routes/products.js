const express = require('express');
const router = express.Router({mergeParams: true});
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync');
const { isAdmin } = require('../middleware')
const products = require('../controllers/products')
const multer = require("multer");
const { storage } = require('../cloudinary/index')
const upload = multer({ storage });

router.route('/new')
    .get(isAdmin, products.renderNew)
    .post(isAdmin, upload.array('image'), wrapAsync(products.createProduct))

router.get('/all', wrapAsync(products.renderAll))

router.route('/:id')
    .get(wrapAsync(products.renderShow))
    .put(isAdmin, upload.array('image'), wrapAsync(products.editProduct))
    .delete(isAdmin, wrapAsync(products.deleteProduct))

router.get('/:id/edit', wrapAsync(products.renderEdit))

module.exports = router;

