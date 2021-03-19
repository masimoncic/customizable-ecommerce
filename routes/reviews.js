const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync');
const reviews = require('../controllers/reviews')
const { isLoggedIn, validateReview } = require('../middleware')

router.post('/', isLoggedIn, validateReview, wrapAsync(reviews.createReview))

router.delete('/:reviewId', wrapAsync(reviews.deleteReview))

module.exports = router;
