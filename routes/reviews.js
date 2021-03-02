const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync');
const reviews = require('../controllers/reviews')

router.post('/', wrapAsync(reviews.createReview))

router.delete('/:reviewId', wrapAsync(reviews.deleteReview))

module.exports = router;
