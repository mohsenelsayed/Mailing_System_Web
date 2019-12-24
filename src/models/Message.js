const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    id: {
        type: Number,
    },
    to: {
        type: String
    },
    from: {
        type: String
    },
    content: {
        type: String
    }
})
module.exports = mongoose.model('Messages', MessageSchema);