require('dotenv/config');
const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    userAvatar: String,
});

UserSchema.methods.generateToken = function () {
    const payload = {
        id: this._id,
        username: this.username,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const User = model('User', UserSchema);

module.exports = User;
