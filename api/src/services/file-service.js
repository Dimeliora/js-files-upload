const fs = require('fs');
const path = require('path');

const User = require('../models/user-model');
const File = require('../models/file-model');
const FileError = require('../errors/file-error');
const {
    getUserFilesDir,
    getRelativeFilePath,
} = require('../helpers/data-path-helpers');
const { updateUserAfterFileDeletionService } = require('./user-service');

exports.fileUploadAbilityCheckService = async (filename, size, userId) => {
    const user = await User.findById(userId).exec();
    if (user.totalDiskSpace - user.usedDiskSpace < size) {
        throw new FileError(`Not enought disk space`, 400);
    }

    const userFilesDirPath = getUserFilesDir(userId);
    const filePath = path.resolve(userFilesDirPath, filename);
    if (fs.existsSync(filePath)) {
        throw new FileError(`File already exists`, 400);
    }
};

exports.fileUploadService = async (file, userId) => {
    const user = await User.findById(userId).exec();

    const userFilesDirPath = getUserFilesDir(userId);
    const filePath = path.resolve(userFilesDirPath, file.name);

    await file.mv(filePath);

    const newFile = new File({
        name: file.name,
        type: file.mimetype,
        size: file.size,
        path: getRelativeFilePath(userId, file.name),
        user: user._id,
    });

    await newFile.save();

    user.usedDiskSpace += file.size;
    user.files.push(newFile);

    await user.save();

    return newFile;
};

exports.getFilesService = async (userId, max = 0) => {
    return await File.find({ user: userId })
        .sort({ createdAt: -1 })
        .limit(max)
        .exec();
};

exports.downloadFileService = async (userId, fileId) => {
    const fileData = await File.findOne({ _id: fileId, user: userId }).exec();

    if (!fileData) {
        throw new FileError('File not found', 404);
    }

    return fileData.path;
};

exports.deleteFileService = async (userId, fileId) => {
    const fileData = await File.findOneAndRemove({
        _id: fileId,
        user: userId,
    }).exec();

    if (!fileData) {
        throw new FileError('File not found', 404);
    }

    await updateUserAfterFileDeletionService(userId, fileData);

    return fileData.path;
};
