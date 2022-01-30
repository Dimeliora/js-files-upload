const FileError = require('../errors/file-error');
const AuthError = require('../errors/auth-error');
const {
    fileUploadAbilityCheckService,
    fileUploadService,
    getFilesService,
    downloadFileService,
    deleteFileService,
} = require('../services/file-service');

exports.fileUploadAbilityCheckController = async (req, res) => {
    try {
        await fileUploadAbilityCheckService(
            req.user.id,
            req.body.filename,
            req.body.size
        );

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

    try {
        await fileUploadService(req.user.id, req.files.file);

        res.sendStatus(201);
    } catch (error) {
        if (error instanceof FileError) {
            return res.status(error.status).json({ message: error.message });
        }

        res.status(500).json({ message: 'Service error. Please, try later' });
    }
};

exports.getFilesController = async (req, res) => {
    try {
        const recentFiles = await getFilesService(req.user.id, req.query.max);

        res.status(200).json(recentFiles);
    } catch (error) {
        if (error instanceof FileError) {
            return res.status(error.status).json({ message: error.message });
        }

        res.status(500).json({ message: 'Service error. Please, try later' });
    }
};

exports.downloadFileController = async (req, res) => {
    try {
        const filePath = await downloadFileService(
            req.user.id,
            req.params.fileId
        );

        res.status(200).sendFile(filePath);
    } catch (error) {
        if (error instanceof FileError) {
            return res.status(error.status).json({ message: error.message });
        }

        res.status(500).json({ message: 'Service error. Please, try later' });
    }
};

exports.deleteFileController = async (req, res) => {
    try {
        await deleteFileService(req.user.id, req.params.fileId);

        res.sendStatus(200);
    } catch (error) {
        if (error instanceof FileError || error instanceof AuthError) {
            return res.status(error.status).json({ message: error.message });
        }

        res.status(500).json({ message: 'Service error. Please, try later' });
    }
};
