const mongoose = require('mongoose');
const Review = require('./reviews');

const ImageSchema = new mongoose.Schema({
    url: String,
    filename: String,
});

ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_150');
})

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