let mongoose = require('mongoose');

// Organisation specific configuration.

let orgSchema = new mongoose.Schema({
    domain: {
        type: String,
        unique: true,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    owner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],  // Org owners, user created first then assigned as owners.
    admin: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],  // Administrator users cannot edit name/domain BUT can edit and delete users plus view action log.
    staff: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],  // All staff who have "service user" rights but are NOT emergency services.
    techContact: String,  // Email for logs, etc.
    publicContact: String  // Email for customer service.
},{ timestamps: true });

mongoose.Schema.Types.String.checkRequired(v => v != null);
module.exports = mongoose.model('Organisation', orgSchema);