const mongoose = require('mongoose');

const AdminSettingSchema = new mongoose.Schema({
  name: String,
  siteName : String,
  categories: [{
    type: String,
  }],
  backgroundImage: String,
})

module.exports = mongoose.model('AdminSetting', AdminSettingSchema);