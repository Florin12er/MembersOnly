const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVIP: { type: Boolean, default: false } // Default to false, change to true if VIP
});

const User = mongoose.model('User', userSchema);

module.exports = User;

