const path = require('path');
const fs = require('fs/promises');

const FileError = require('../errors/file-error');
const { getUserFilesDir } = require('../helpers/data-path-helpers');

exports.createUserDirService = async (userId) => {
    const userFilesDirPath = getUserFilesDir(userId);

    try {
        await fs.mkdir(userFilesDirPath, { recursive: true });
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.deleteUserFileService = async (filepath) => {
    try {
        await fs.rm(filepath, { force: true });
    } catch (error) {
        throw new FileError('File not found', 404);
    }
};
