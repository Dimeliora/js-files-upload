const FileError = require('../errors/file-error');
const {
    fileUploadAbilityCheckService,
    fileUploadService,
    getFilesService,
} = require('../services/file-service');

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
        const recentFilesData = await getFilesService(id, max);

        res.status(200).json(recentFilesData);
    } catch (error) {
        if (error instanceof FileError) {
            return res.status(error.status).json({ message: error.message });
        }

        res.status(500).json({ message: 'Service error. Please, try later' });
    }
};
