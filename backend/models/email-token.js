let mongoose = require('mongoose');

let emailTokenSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
},{ timestamps: true });

module.exports = mongoose.model("EmailToken", emailTokenSchema);