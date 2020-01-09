let mongoose = require('mongoose');
let Service = require('./service');

// Profile for service-users, i.e. 999 staff. Simply holds info about which org they work for.

let serviceProfileSchema = mongoose.Schema({
    service: Service
});

module.exports = mongoose.model("ProfileService", serviceProfileSchema);