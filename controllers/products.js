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
    const product = await Product.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author',
        }
    }).populate('author');
    res.render('products/show', { product })
}

module.exports.renderEdit = async(req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product) {
        req.flash('error', 'Product not Found');
        return res.redirect('/products/all');
    }
    res.render('products/edit', { product });
}

module.exports.editProduct = async(req, res) => {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(id, {...req.body.product});
    res.redirect(`/products/${product.id}`);
}

module.exports.deleteProduct = async(req, res) => {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    req.flash('success', 'Deleted Product');
    res.redirect('/products/all')
}