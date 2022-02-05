const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { existsSync } = require("fs");

const FileError = require("../errors/file-error");
const { isProperImageFile } = require("../helpers/check-mime-types");
const {
    getUserFilesDir,
    getUserDir,
    getRelativeFilePath,
} = require("../helpers/data-path-helpers");

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

    return existsSync(filePath);
};

exports.writeUserFileToFSService = async (userId, file, filename) => {
    const userFilesDirPath = getUserFilesDir(userId);
    const filePath = path.resolve(userFilesDirPath, filename);

    await file.mv(filePath);

    return getRelativeFilePath(userId, filename);
};

exports.readUserAvatarService = (userId) => {
    const userDir = getUserDir(userId);
    const userAvatarImagePath = path.resolve(userDir, "avatar.png");

    const isFileExist = existsSync(userAvatarImagePath);
    if (!isFileExist) {
        throw new FileError("File not found", 404);
    }

    return userAvatarImagePath;
};

exports.uploadUserAvatarService = async (userId, file) => {
    if (!isProperImageFile(file.mimetype)) {
        throw new FileError("Invalid image file type", 400);
    }

    const fileData = await Jimp.read(file.data);

    const userDir = getUserDir(userId);
    const userAvatarImagePath = path.resolve(userDir, "avatar.png");

    fileData.resize(100, Jimp.AUTO).quality(80).write(userAvatarImagePath);
};

exports.deleteUserFilesFromFSService = async (filesPathArray) => {
    for (const filePath of filesPathArray) {
        try {
            await fs.rm(filePath, { force: true });
        } catch (error) {
            throw new FileError("File not found", 404);
        }
    }
};
