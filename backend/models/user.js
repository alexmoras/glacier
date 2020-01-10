let mongoose = require('mongoose');

// Main user schema - this is the authentication side of things.

let userSchema = new mongoose.Schema({
    email: [{
        type: String,
        unique: true,
        required: true
    }],
    hash: {
        type: String,
        required: true
    }
},{ timestamps: true });

module.exports = mongoose.model('User', userSchema);