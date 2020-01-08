let mongoose = require('mongoose');
let userModel = require('./user');

// Organisation class that allows for multi-site hosting.

let orgSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    domain: String,
    owner: userModel,  // Org owner-user created at org initialization.
    staff: [userModel]  // All staff who have admin (non-delete) rights.
},{ timestamps: true });

module.exports = mongoose.model('Organisation', orgSchema);