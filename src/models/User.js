const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'is invalid']
    }
    ,
    password: {
        type: String,
    }
})

module.exports = mongoose.model('Users', UserSchema);