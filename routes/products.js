const express = require('express');
const router = express.Router({mergeParams: true});
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync');
const { isAdmin } = require('../middleware')
const products = require('../controllers/products')

router.route('/new')
    .get(isAdmin, products.renderNew)
    .post(isAdmin, wrapAsync(products.createProduct))

router.get('/all', wrapAsync(products.renderAll))

router.route('/:id')
    .get(wrapAsync(products.renderShow))

module.exports = router;

