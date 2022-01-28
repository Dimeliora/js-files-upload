const bcrypt = require('bcryptjs');

const User = require('../models/user-model');
const AuthError = require('../errors/auth-error');
const { createUserDirService } = require('./fs-service');

exports.authService = async (userId) => {
    const user = await User.findById(userId).exec();
    if (!user) {
        throw new AuthError('User not found', 404);
    }

    return user;
};

exports.loginService = async (email, password) => {
    const user = await User.findOne({ email }).exec();
    if (!user) {
        throw new AuthError('User not found', 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
        throw new AuthError('Invalid Password', 400);
    }

    return user;
};

exports.registerService = async (username, email, password) => {
    const candidate = await User.findOne({ email }).exec();
    if (candidate) {
        throw new AuthError('User already exists', 400);
    }

    const salt = await bcrypt.genSalt(8);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({ username, email, passwordHash });
    await user.save();

    await createUserDirService(user._id.toString());

    return user;
};
