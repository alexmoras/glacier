let mongoose = require('mongoose');

// Profile for service-users, i.e. 999 staff. Simply holds info about which org they work for.

let serviceUserSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true
    },
    staffID: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: true
    }
},{ timestamps: true });

module.exports = mongoose.model("ServiceUser", serviceUserSchema);