const User = require('../models/user-model');
const AuthError = require('../errors/auth-error');

exports.getUserDataService = async (userId) => {
    const user = await User.findById(userId).exec();
    if (!user) {
        throw new AuthError('User not found', 404);
    }

    return user;
};

exports.updateUserAfterFileDeletionService = async (userId, { _id, size }) => {
    const user = await User.findById(userId).exec();
    if (!user) {
        throw new AuthError('User not found', 404);
    }

    user.files = user.files.filter(
        (file) => file._id.toString() !== _id.toString()
    );
    user.usedDiskSpace -= size;

    await user.save();
};
