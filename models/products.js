const mongoose = require('mongoose');
const Review = require('./reviews');

const ProductSchema = new mongoose.Schema ({
    name: String,
    description: String,
    category: String,
    price: Number,
    //image:
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
    //keywords:
    
})

module.exports = mongoose.model('Product', ProductSchema);