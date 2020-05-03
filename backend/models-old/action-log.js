let mongoose = require('mongoose');

// Log model stores the action taken by a user.

let actionLogSchema = mongoose.Schema({
    onUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    byUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    action: {
        type: String,
        required: true
    }
},{ timestamps: true });

module.exports = mongoose.model("ActionLog", actionLogSchema);