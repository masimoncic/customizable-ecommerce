const Product = require('../models/products')
const Review = require('../models/reviews')

module.exports.createReview = async(req, res) => {
    const product = await Product.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    product.reviews.push(review);
    await review.save();
    await product.save();
    req.flash('success', 'Review Posted');
    res.redirect(`/products/${product._id}`)
}

module.exports.deleteReview = async(req, res) => {
    const { id, reviewId } = req.params;
    await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewId }});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Deleted Review');
    res.redirect(`/products/${id}`)
}