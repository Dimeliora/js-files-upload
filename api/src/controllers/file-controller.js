const FileError = require('../errors/file-error');
const {
    fileUploadAbilityCheck,
    fileUpload,
} = require('../services/file-service');

exports.fileUploadAbilityCheck = async (req, res) => {
    const { filename, size } = req.body;
    const { id } = req.user;

    try {
        await fileUploadAbilityCheck(filename, size, id);

        res.sendStatus(200);
    } catch (error) {
        if (error instanceof FileError) {
            return res.status(error.status).json({ message: error.message });
        }

        res.status(500).json({ message: 'Service error. Please, try later' });
    }
};

exports.fileUpload = async (req, res) => {
    if (!req.files) {
        return;
    }

    const { file } = req.files;
    const { id } = req.user;

    try {
        const newFileData = await fileUpload(file, id);

        res.status(201).json(newFileData);
    } catch (error) {
        if (error instanceof FileError) {
            return res.status(error.status).json({ message: error.message });
        }

        res.status(500).json({ message: 'Service error. Please, try later' });
    }
};
