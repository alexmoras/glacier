let mongoose = require('mongoose');

// Used by the standard users, the ones that want to store their ICE details and those with an organisation email.

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
},{ _id : false});

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
},{ _id : false});

let idSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    }
},{ _id : false});

let userSchema = new mongoose.Schema({
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
        type: String,
        required: true,
    },
    phone: [String],
    address: {
        type: [addressSchema],
        required: false
    },
    medical: {
        type: String,
        required: true
    },
    contacts: {
        type: [contactSchema],
        required: false
    },
    idNumber: {
        type: [idSchema],
        required: false
    }
},{ timestamps: true });

module.exports = mongoose.model('IceUser', userSchema);