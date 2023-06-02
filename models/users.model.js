const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login: {},
    password: {},
    avatar: {},
    number: {}
});

module.exports = mongoose.model('User', userSchema);