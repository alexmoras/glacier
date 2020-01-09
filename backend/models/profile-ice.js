let mongoose = require('mongoose');
let userModel = require('./user');
let orgModel = require('./organisation');

// Used by the standard users, the ones that want to store their ICE details.

let phoneSchema = new mongoose.Schema({
    phone: {
        type: String,
        unique: false,
        required: true
    }
},{ _id : false, timestamps: true });

let addressSchema = new mongoose.Schema({
    line1: {
        type: String,
        required: true
    },
    line2: {
        type: String,
        required: true
    },
    town: {
        type: String,
        required: true
    },
    county: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    postcode: {
        type: String,
        required: true
    }
},{ _id : false, timestamps: true });

let contactSchema = new mongoose.Schema({
    forename: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    phone: [phoneSchema],
    address: [addressSchema],
    relationship: {
        type: String,
        required: true
    }
},{ _id : false, timestamps: true });

let profileIceSchema = new mongoose.Schema({
    user: userModel,
    forename: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true,
    },
    phone: [phoneSchema],
    address: [addressSchema],
    medical: {
        type: String,
        required: true
    },
    contacts: [contactSchema],
    organisation: [orgModel]  // ICE users can belong to multiple organisations. In this implementation, there's only one org.
},{ timestamps: true });

module.exports = mongoose.model('ProfileICE', profileIceSchema);