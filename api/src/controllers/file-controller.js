const FileError = require('../errors/file-error');
const { fileUpload } = require('../services/file-service');

exports.fileUpload = async (req, res) => {
    const { file } = req.files;
    const { id } = req.user;

    try {
        const newFileData = await fileUpload(file, id);

        res.status(201).json(newFileData);
    } catch (error) {
        if (error instanceof FileError) {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: 'Service error. Please, try later' });
    }
};
