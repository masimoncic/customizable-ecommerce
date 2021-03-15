const mongoose = require('mongoose');

//const ContactSchema = new mongoose.Schema({})

const AdminSettingSchema = new mongoose.Schema({
  name: String,
  siteName : String,
  categories: [{
    type: String,
  }],
  backgroundImage: String,
  contact: {
    adminName: String,
    email: String,
    phoneNumber: String,
  }
})

module.exports = mongoose.model('AdminSetting', AdminSettingSchema);