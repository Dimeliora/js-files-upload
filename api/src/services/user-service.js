const User = require("../models/user-model");
const AuthError = require("../errors/auth-error");

exports.getUserDataService = async (userId) => {
    const user = await User.findById(userId).exec();
    if (!user) {
        throw new AuthError("User not found", 404);
    }

    return user;
};

exports.updateUserAfterFilesDeletionService = async (userId, filesDocs) => {
    const user = await User.findById(userId).exec();
    if (!user) {
        throw new AuthError("User not found", 404);
    }

    const deletedFilesIds = filesDocs.map((file) => file._id.toString());
    user.files = user.files.filter(
        (file) => !deletedFilesIds.includes(file._id.toString())
    );

    const deletedFilesSize = filesDocs.reduce(
        (sum, file) => sum + file.size,
        0
    );
    user.usedDiskSpace -= deletedFilesSize;

    await user.save();
};
