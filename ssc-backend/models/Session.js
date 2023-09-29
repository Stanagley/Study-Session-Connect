const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    location: String,
    major: String,
    className: String,
    time: String
});

module.exports = mongoose.model('Session', sessionSchema);
