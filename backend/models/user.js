let mongoose = require('mongoose');

// Main user schema - this is the authentication side of things.

let emailSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    }
},{ _id : false, timestamps: true });

let userSchema = new mongoose.Schema({
    email: [emailSchema],
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
},{ timestamps: true });

module.exports = mongoose.model('User', userSchema);