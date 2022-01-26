const fs = require('fs');
const path = require('path');

const User = require('../models/user-model');
const File = require('../models/file-model');
const FileError = require('../errors/file-error');
const { getUserFilesDir } = require('../helpers/data-path-helpers');

exports.fileUploadAbilityCheck = async (filename, size, userId) => {
    const user = await User.findById(userId);
    if (user.totalDiskSpace - user.usedDiskSpace < size) {
        throw new FileError(`Not enought disk space for ${filename}`, 400);
    }

    const userFilesDirPath = getUserFilesDir(userId);
    const filePath = path.resolve(userFilesDirPath, filename);
    if (fs.existsSync(filePath)) {
        throw new FileError(`File ${filename} already exists`, 400);
    }
};

exports.fileUpload = async (file, userId) => {
    const user = await User.findById(userId);

    const userFilesDirPath = getUserFilesDir(userId);
    const filePath = path.resolve(userFilesDirPath, file.name);

    file.mv(filePath);

    const fileType = file.name.split('.').pop();
    const newFile = new File({
        name: file.name,
        type: fileType,
        size: file.size,
        user: user._id,
    });

    await newFile.save();

    user.usedDiskSpace += file.size;
    user.files.push(newFile);

    await user.save();

    return newFile;
};
