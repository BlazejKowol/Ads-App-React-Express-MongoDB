const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    title: {},
    content: {},
    date: {},
    image: {},
    price: {},
    location: {},
    user: {}
});

module.exports = mongoose.model('Ad', adSchema);