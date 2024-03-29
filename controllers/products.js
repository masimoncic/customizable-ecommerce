const methodOverride = require('method-override');
const Product = require('../models/products');
const User = require('../models/users');
const AdminSettings = require('../models/adminSettings');
const { cloudinary } = require('../cloudinary');


module.exports.renderAll = async (req, res) => {
    const products = await Product.find({});
    res.render('products/all', { products })
}

module.exports.renderNew = (req, res) => {
    res.render('products/new');
}

module.exports.createProduct = async (req, res) => {
    const product = new Product(req.body.product);
    product.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    await product.save();
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
    //get average review score
    let avg = 0;
    if (product.reviews.length > 0) {
      let sum = 0;
      for (i = 0; i < product.reviews.length; i++) {
        sum += product.reviews[i].rating;
      };
      avg = sum / product.reviews.length;
    }

    res.render('products/show', { product, avg })
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
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    product.images.push(...imgs);
    product.save();
    if(req.body.deleteImages) {
        for(let filename of req.body.deleteImages){
          await cloudinary.uploader.destroy(filename);
        }
        await product.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}})
      }
    res.redirect(`/products/${product.id}`);
}

module.exports.deleteProduct = async(req, res) => {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    req.flash('success', 'Deleted Product');
    res.redirect('/products/all')
}

module.exports.add = async(req, res) => {
  const productId = req.params.id;
  const user = await User.findById(req.user._id)
  cartItem = {
    item: productId,
    quantity: 1,
  }
  user.cart.push(cartItem)
  await user.save();
  req.flash('success', 'Added to shopping cart');
  res.redirect(`/products/${productId}`)
}

module.exports.renderBrowse = async(req, res) => {
  const { categories } = await AdminSettings.findOne({ 'name' : 'adminSettings' });
  res.render('products/browse', { categories })
}

module.exports.renderBrowseCategory = async(req, res) => {
  const adminSettings = await AdminSettings.findOne({ 'name' : 'adminSettings' })
  const { category } = req.params;
  const products = await Product.find({'category': category})
  //console.log(products)
  res.render('products/browseCategory', {category, products })
}