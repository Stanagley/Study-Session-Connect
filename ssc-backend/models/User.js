const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String  // Note: Storing passwords as plaintext is insecure. You'd use hashing in a real application.
});

module.exports = mongoose.model('User', userSchema);
