const AdminSettings = require('../models/adminSettings');
const methodOverride = require('method-override');


module.exports.renderHome = async (req, res) => {
  const adminSettings = await AdminSettings.findOne({ 'name' : 'adminSettings' })
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

module.exports.deleteCategory = async(req, res) => {
  console.log(req.params);
  const adminSettings = await AdminSettings.findOne({ 'name' : 'adminSettings' })
  const { category }= req.params;
  await adminSettings.categories.pull(category)
  await adminSettings.save();
  res.redirect('/admin/categories')
}

module.exports.renderTitle = async(req, res) => {
  const adminSettings = await AdminSettings.findOne({ 'name' : 'adminSettings' })
  res.render('admin/title', { adminSettings })
}

module.exports.changeTitle = async(req, res) => {
  const { title } = req.body;
  const adminSettings = await AdminSettings.findOneAndUpdate({ 'name' : 'adminSettings' }, {'siteName' : title })
  adminSettings.siteName = title;
  res.redirect('/admin/title');
}

module.exports.renderImages = async(req, res) => {
  res.render('admin/images')
}

module.exports.renderContact = async(req, res) => {
  const adminSettings = await AdminSettings.findOne({ 'name' : 'adminSettings' })
  res.render('admin/contact', { adminSettings });
}

module.exports.updateContact = async(req, res) => {
  const { adminName, email, phoneNumber} = req.body;
  const adminSettings = await AdminSettings.findOne({ 'name' : 'adminSettings' })
  adminSettings.contact.adminName = adminName;
  adminSettings.contact.email = email;
  adminSettings.contact.phoneNumber = phoneNumber;
  await adminSettings.save();
  res.redirect('/admin/contact');
}