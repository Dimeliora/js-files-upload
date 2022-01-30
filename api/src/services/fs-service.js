const { constants } = require('fs');
const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');

const FileError = require('../errors/file-error');
const { isProperImageFile } = require('../helpers/check-mime-types');
const { getUserFilesDir, getUserDir } = require('../helpers/data-path-helpers');

exports.createUserDirService = async (userId) => {
    const userFilesDirPath = getUserFilesDir(userId);

    try {
        await fs.mkdir(userFilesDirPath, { recursive: true });
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.readUserAvatarService = async (userId) => {
    try {
        const userDir = getUserDir(userId);
        const userAvatarImagePath = path.resolve(userDir, 'avatar.png');
        await fs.access(userAvatarImagePath, constants.F_OK);

        return userAvatarImagePath;
    } catch (error) {
        throw new FileError('File not found', 404);
    }
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

exports.deleteUserFileFromFSService = async (filepath) => {
    try {
        await fs.rm(filepath, { force: true });
    } catch (error) {
        throw new FileError('File not found', 404);
    }
};
