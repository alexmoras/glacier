let mongoose = require('mongoose');

let serviceSchema = mongoose.Schema({
    uniqueName: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    contact: String
});

module.exports = mongoose.Model('Service', serviceSchema);