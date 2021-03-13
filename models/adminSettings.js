const mongoose = require('mongoose');

const AdminSettingSchema = new mongoose.Schema({
  name: String,
  siteName : String,
  categories: [{
    type: String,
  }],
  backgroundImage: String,
  //contact:
})

module.exports = mongoose.model('AdminSetting', AdminSettingSchema);