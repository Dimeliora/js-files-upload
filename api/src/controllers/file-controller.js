const path = require('path');

const FileError = require('../errors/file-error');
const { dataDir } = require('../helpers/data-path-helpers');
const {
    fileUploadAbilityCheckService,
    fileUploadService,
    getFilesService,
    downloadFileService,
    deleteFileService,
} = require('../services/file-service');
const { deleteUserFileService } = require('../services/fs-service');

exports.fileUploadAbilityCheckController = async (req, res) => {
    const { filename, size } = req.body;
    const { id } = req.user;

    try {
        await fileUploadAbilityCheckService(filename, size, id);

        res.sendStatus(200);
    } catch (error) {
        if (error instanceof FileError) {
            return res.status(error.status).json({ message: error.message });
        }

        res.status(500).json({ message: 'Service error. Please, try later' });
    }
};

exports.fileUploadController = async (req, res) => {
    if (!req.files) {
        return;
    }

    const { file } = req.files;
    const { id } = req.user;

    try {
        const newFileData = await fileUploadService(file, id);

        res.status(201).json(newFileData);
    } catch (error) {
        if (error instanceof FileError) {
            return res.status(error.status).json({ message: error.message });
        }

        res.status(500).json({ message: 'Service error. Please, try later' });
    }
};

exports.getFilesController = async (req, res) => {
    const { id } = req.user;
    const { max } = req.query;

    try {
        const recentFiles = await getFilesService(id, max);

        res.status(200).json(recentFiles);
    } catch (error) {
        if (error instanceof FileError) {
            return res.status(error.status).json({ message: error.message });
        }

        res.status(500).json({ message: 'Service error. Please, try later' });
    }
};

exports.downloadFileController = async (req, res) => {
    const { id: userId } = req.user;
    const { fileId } = req.params;

    try {
        const relativeFilePath = await downloadFileService(userId, fileId);
        const filepath = path.resolve(dataDir, relativeFilePath);

        res.status(200).sendFile(filepath);
    } catch (error) {
        if (error instanceof FileError) {
            return res.status(error.status).json({ message: error.message });
        }

        res.status(500).json({ message: 'Service error. Please, try later' });
    }
};

exports.deleteFileController = async (req, res) => {
    const { id: userId } = req.user;
    const { fileId } = req.params;

    try {
        const relativeFilePath = await deleteFileService(userId, fileId);
        const filepath = path.resolve(dataDir, relativeFilePath);

        await deleteUserFileService(filepath);

        res.sendStatus(200);
    } catch (error) {
        if (error instanceof FileError) {
            return res.status(error.status).json({ message: error.message });
        }

        res.status(500).json({ message: 'Service error. Please, try later' });
    }
};
