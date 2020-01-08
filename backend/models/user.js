let mongoose = require('mongoose');

let emailSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    }
},{ _id : false, timestamps: true });

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

let userSchema = new mongoose.Schema({
    email: [emailSchema]
},{ timestamps: true });

let profileSchema = new mongoose.Schema({
    user: userSchema,
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
    contacts: [contactSchema]
},{ timestamps: true });

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Profile', profileSchema);