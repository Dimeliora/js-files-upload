const User = require('../models/user-model');
const AuthError = require('../errors/auth-error');

exports.getUserDataService = async (userId) => {
    const user = await User.findById(userId).exec();
    if (!user) {
        throw new AuthError('User not found', 404);
    }

    return user;
};