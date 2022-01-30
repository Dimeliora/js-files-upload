const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');
const { existsSync } = require('fs');

const FileError = require('../errors/file-error');
const { isProperImageFile } = require('../helpers/check-mime-types');
const {
    getUserFilesDir,
    getUserDir,
    getRelativeFilePath,
} = require('../helpers/data-path-helpers');

exports.createUserDirService = async (userId) => {
    const userFilesDirPath = getUserFilesDir(userId);

    try {
        await fs.mkdir(userFilesDirPath, { recursive: true });
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.checkUserFileExistanceService = (userId, filename) => {
    const userFilesDirPath = getUserFilesDir(userId);
    const filePath = path.resolve(userFilesDirPath, filename);

    const isFileExist = existsSync(filePath);
    if (isFileExist) {
        throw new FileError(`File already exists`, 400);
    }
};

exports.writeUserFileToFSService = async (userId, file) => {
    const userFilesDirPath = getUserFilesDir(userId);
    const filePath = path.resolve(userFilesDirPath, file.name);

    await file.mv(filePath);

    return getRelativeFilePath(userId, file.name);
};

exports.readUserAvatarService = (userId) => {
    const userDir = getUserDir(userId);
    const userAvatarImagePath = path.resolve(userDir, 'avatar.png');

    const isFileExist = existsSync(userAvatarImagePath);
    if (!isFileExist) {
        throw new FileError('File not found', 404);
    }

    return userAvatarImagePath;
};

exports.uploadUserAvatarService = async (userId, file) => {
    if (!isProperImageFile(file.mimetype)) {
        throw new FileError('Invalid image file type', 400);
    }

    const fileData = await Jimp.read(file.data);

    const userDir = getUserDir(userId);
    const userAvatarImagePath = path.resolve(userDir, 'avatar.png');

    fileData.write(userAvatarImagePath);
};

exports.deleteUserFileFromFSService = async (filePath) => {
    try {
        await fs.rm(filePath, { force: true });
    } catch (error) {
        throw new FileError('File not found', 404);
    }
};
