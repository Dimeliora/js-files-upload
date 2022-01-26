const path = require('path');

const User = require('../models/user-model');
const File = require('../models/file-model');
const FileError = require('../errors/file-error');
const { getUserFilesDir } = require('../helpers/data-path-helpers');

exports.fileUpload = async (file, userId) => {
    const user = await User.findById(userId);
    if (user.totalDiskSpace - user.usedDiskSpace < file.size) {
        throw new FileError('Not enought disk space');
    }

    user.usedDiskSpace += file.size;

    const userFilesDirPath = getUserFilesDir(userId);
    file.mv(path.resolve(userFilesDirPath, file.name));

    const fileType = file.name.split('.').pop();
    const newFile = new File({
        name: file.name,
        type: fileType,
        size: file.size,
        user: user._id,
    });

    await newFile.save();
    await user.save();

    return newFile;
};
