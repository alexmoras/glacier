let mongoose = require('mongoose');

let emailTokenSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
},{ timestamp: true });

module.exports = mongoose.model("EmailToken", emailTokenSchema);