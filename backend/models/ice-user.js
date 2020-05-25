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
},{ _id : false, minimize: false});

let contactSchema = new mongoose.Schema({
    forename: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    phone: {
        type: [String],
        required: true
    },
    address: {
        type: [addressSchema],
        required: true
    },
    relationship: {
        type: String,
        required: true
    }
},{ _id : false, minimize: false});

let idSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    }
},{ _id : false, minimize: false});

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
    phone: {
        type: [String],
        required: true
    },
    address: {
        type: [addressSchema],
        required: true
    },
    medical: {
        type: String,
        required: true
    },
    contacts: {
        type: [contactSchema],
        required: true
    },
    idNumber: {
        type: [idSchema],
        required: true
    }
},{ timestamps: true, minimize: false });

mongoose.Schema.Types.String.checkRequired(v => v != null);
module.exports = mongoose.model('IceUser', userSchema);