let mongoose = require('mongoose');

let emailTokenSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    }
},{ timestamps: true });

module.exports = mongoose.model("EmailToken", emailTokenSchema);