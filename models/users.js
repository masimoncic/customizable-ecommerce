const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const CartSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: Number,
})

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    admin: Boolean,
    cart: [CartSchema],
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);

