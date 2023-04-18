const mongoose = require('mongoose')

const UserScheme = new mongoose.Schema({
    'email': {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { collection: 'User-account' })

const User = mongoose.model('UserModel', UserScheme)

module.exports = User