const path = require('path');

const User = require('../models/user-model');
const AuthError = require('../errors/auth-error');
const FileError = require('../errors/file-error');
const { getUserDir } = require('../helpers/data-path-helpers');
const { isProperImageFile } = require('../helpers/check-mime-types');

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

exports.uploadUserAvatarService = async (userId, file) => {
    if (!isProperImageFile(file.mimetype)) {
        throw new FileError('Invalid image file type', 400);
    }

    const filepath = path.resolve(getUserDir(userId), file.name);

    await file.mv(filepath);
};
