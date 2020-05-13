let mongoose = require('mongoose');

let emailTokenSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    email: String
},{ timestamps: true });

module.exports = mongoose.model("EmailToken", emailTokenSchema);