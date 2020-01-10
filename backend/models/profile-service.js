let mongoose = require('mongoose');

// Profile for service-users, i.e. 999 staff. Simply holds info about which org they work for.

let serviceProfileSchema = mongoose.Schema({
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        unique: true
    }
});

module.exports = mongoose.model("ServiceProfile", serviceProfileSchema);