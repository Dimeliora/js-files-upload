require('dotenv/config');
const { Schema, model, Types } = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
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
    totalDiskSpace: {
        type: Number,
        default: 100 * 1024 ** 2,
    },
    usedDiskSpace: {
        type: Number,
        default: 0,
    },
    files: [
        {
            type: Types.ObjectId,
            ref: 'File',
        },
    ],
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
