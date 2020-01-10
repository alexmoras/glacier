let mongoose = require('mongoose');

// Used by the standard users, the ones that want to store their ICE details.

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
    phone: [String],
    address: [addressSchema],
    relationship: {
        type: String,
        required: true
    }
},{ _id : false, timestamps: true });

let profileIceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
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
    phone: [String],
    address: [addressSchema],
    medical: {
        type: String,
        required: true
    },
    contacts: [contactSchema],
    organisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organisation'
    }  // ICE users can belong to multiple organisations. In this implementation, there's only one org.
},{ timestamps: true });

module.exports = mongoose.model('ICEProfile', profileIceSchema);