const path = require("path");

const User = require("../models/user-model");
const File = require("../models/file-model");
const FileError = require("../errors/file-error");
const { deleteUserFilesFromFSService } = require("./fs-service");
const { updateUserAfterFilesDeletionService } = require("./user-service");
const {
    checkUserFileExistanceService,
    writeUserFileToFSService,
} = require("./fs-service");
const { dataDir } = require("../helpers/data-path-helpers");
const { getPostfixedFileName } = require("../helpers/get-postfixed-filename");

exports.fileUploadAbilityCheckService = async (userId, size) => {
    const user = await User.findById(userId).exec();

    if (user.totalDiskSpace - user.usedDiskSpace < size) {
        throw new FileError(`No space for file`, 400);
    }
};

exports.fileUploadService = async (userId, file) => {
    const files = await File.find({ user: userId }).exec();

    const userFilesNames = files.map((file) => file.name);
    const postfixedFilename = getPostfixedFileName(userFilesNames, file.name);

    const user = await User.findById(userId).exec();

    const relativeFilePath = await writeUserFileToFSService(
        userId,
        file,
        postfixedFilename
    );

    const newFile = new File({
        name: postfixedFilename,
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
        throw new FileError("File not found", 404);
    }

    if (!checkUserFileExistanceService(userId, fileData.name)) {
        throw new FileError("File not found", 404);
    }

    return path.resolve(dataDir, fileData.path);
};

exports.deleteFilesService = async (userId, fileIds) => {
    const filesDocs = await File.find({
        _id: { $in: fileIds },
        user: userId,
    }).exec();

    for (const file of filesDocs) {
        await file.remove();
    }

    const filesPathArray = filesDocs.map((file) =>
        path.resolve(dataDir, file.path)
    );

    await deleteUserFilesFromFSService(filesPathArray);

    await updateUserAfterFilesDeletionService(userId, filesDocs);
};
