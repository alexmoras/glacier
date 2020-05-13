let mongoose = require('mongoose');

// Base user schema - this is the authentication side of things.

let baseUserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    isService: {
        type: Boolean,
        default: false
    }
},{ timestamps: true });

module.exports = mongoose.model('User', baseUserSchema);