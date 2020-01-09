let mongoose = require('mongoose');
let userModel = require('./user');

// Organisation class that allows for multi-site hosting.

let orgSchema = new mongoose.Schema({
    uniqueName: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    domain: String,
    owner: [userModel],  // Org owners, user created first then assigned as owners.
    staff: [userModel],  // All staff who have admin (non-delete) rights.
    techContact: String,  // Email for logs, etc.
    publicContact: String  // Email for customer service.
},{ timestamps: true });

module.exports = mongoose.model('Organisation', orgSchema);