const AdminSettings = require('../models/adminSettings');



module.exports.renderHome = async (req, res) => {
  const adminSettings = await AdminSettings.findOne({ 'name' : 'adminSettings' })
  console.log(adminSettings);
    res.render('admin/home');

}

module.exports.renderCategories = async(req, res) => {
  const { categories } = await AdminSettings.findOne({ 'name' : 'adminSettings' });
  res.render('admin/categories', { categories })
}

module.exports.addCategory = async(req, res) => {
  const adminSettings = await AdminSettings.findOne({ 'name' : 'adminSettings' })
  const { newCategory } = req.body
  adminSettings.categories.push(newCategory);
  await adminSettings.save();
  res.redirect('categories')
}

module.exports.renderTitle = async(req, res) => {
  res.render('admin/title')
}

module.exports.renderImages = async(req, res) => {
  res.render('admin/images')
}

module.exports.renderContact = async(req, res) => {
  res.render('admin/contact');
}