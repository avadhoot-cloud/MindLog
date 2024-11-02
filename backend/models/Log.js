// models/Log.js
const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    action: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Log = mongoose.model('Log', LogSchema);
module.exports = Log;
