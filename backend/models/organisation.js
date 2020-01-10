let mongoose = require('mongoose');

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
    owner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],  // Org owners, user created first then assigned as owners.
    staff: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],  // All staff who have admin (non-delete) rights.
    techContact: String,  // Email for logs, etc.
    publicContact: String  // Email for customer service.
},{ timestamps: true });

module.exports = mongoose.model('Organisation', orgSchema);