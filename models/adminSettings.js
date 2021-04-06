const mongoose = require('mongoose');

//const ContactSchema = new mongoose.Schema({})

const AdminSettingSchema = new mongoose.Schema({
  name: String,
  siteName : String,
  categories: [{
    type: String,
  }],
  //backgroundImage: String,
  contact: {
    adminName: String,
    email: String,
    phoneNumber: String,
  },
  homePage: {
    heading: String,
    description: String,
    backgroundImage: {
      url: String,
      filename: String,
    },
  },
  tax: Number,
  shippingFlat: Number,
  shippingPercent: Number,
})

module.exports = mongoose.model('AdminSetting', AdminSettingSchema);