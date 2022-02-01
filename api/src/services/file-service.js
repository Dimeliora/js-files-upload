const path = require('path');

const User = require('../models/user-model');
const File = require('../models/file-model');
const FileError = require('../errors/file-error');
const { deleteUserFileFromFSService } = require('./fs-service');
const { updateUserAfterFileDeletionService } = require('./user-service');
const {
    checkUserFileExistanceService,
    writeUserFileToFSService,
} = require('./fs-service');
const { dataDir } = require('../helpers/data-path-helpers');

exports.fileUploadAbilityCheckService = async (userId, filename, size) => {
    const user = await User.findById(userId).exec();

    if (user.totalDiskSpace - user.usedDiskSpace < size) {
        throw new FileError(`No space for file`, 400);
    }

    if (checkUserFileExistanceService(userId, filename)) {
        throw new FileError(`Already exists`, 400);
    }
};

exports.fileUploadService = async (userId, file) => {
    const user = await User.findById(userId).exec();

    const relativeFilePath = await writeUserFileToFSService(userId, file);

    const newFile = new File({
        name: file.name,
        type: file.mimetype,
        size: file.size,
        path: relativeFilePath,
        user: user._id,
    });

    await newFile.save();

    user.usedDiskSpace += file.size;
    user.files.push(newFile);

    await user.save();
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

    if (!checkUserFileExistanceService(userId, fileData.name)) {
        throw new FileError('File not found', 404);
    }

    return path.resolve(dataDir, fileData.path);
};

exports.deleteFileService = async (userId, fileId) => {
    const fileData = await File.findOneAndRemove({
        _id: fileId,
        user: userId,
    }).exec();

    if (!fileData) {
        throw new FileError('File not found', 404);
    }

    const filePath = path.resolve(dataDir, fileData.path);
    await deleteUserFileFromFSService(filePath);

    await updateUserAfterFileDeletionService(userId, fileData);
};
