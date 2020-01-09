let mongoose = require('mongoose');
let User = require('./user');

// Log model stores the action taken by a user.

let actionLogSchema = mongoose.Schema({
    onUser: User,
    byUser: User,
    action: {
        type: String,
        required: true
    }
},{ timestamps: true, _id: false });