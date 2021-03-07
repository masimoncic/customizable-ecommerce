const mongoose = require('mongoose');
const Review = require('./reviews');

const ImageSchema = new mongoose.Schema({
    url: String,
    filename: String,
});

const ProductSchema = new mongoose.Schema ({
    name: String,
    description: String,
    category: String,
    price: Number,
    images: [ImageSchema],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
    //keywords:
    
})

module.exports = mongoose.model('Product', ProductSchema);