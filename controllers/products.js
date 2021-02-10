const methodOverride = require('method-override');
const Product = require('../models/products')

module.exports.renderAll = async (req, res) => {
    const products = await Product.find({});
    res.render('products/all', { products })
}

module.exports.renderNew = (req, res) => {
    res.render('products/new');
}

module.exports.createProduct = async (req, res) => {
    const product = new Product(req.body.product);
    await product.save();
    console.log(product);
    req.flash('success', 'Added Product');
    res.redirect('/admin')
}

module.exports.renderShow = async(req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('products/show', { product })
}