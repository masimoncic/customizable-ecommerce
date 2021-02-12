const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema ({
    name: String,
    description: String,
    category: String,
    price: Number,
    //image:
    //reviews:
    //keywords:
    
})

module.exports = mongoose.model('Product', ProductSchema);