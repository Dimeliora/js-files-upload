const AuthError = require('../errors/auth-error');
const FileError = require('../errors/file-error');
const { getUserDataService } = require('../services/user-service');
const {
    uploadUserAvatarService,
    readUserAvatarService,
} = require('../services/fs-service');

exports.getUserDataController = async (req, res) => {
    try {
        const userData = await getUserDataService(req.user.id);

        res.status(200).json({ usedDiskSpace: userData.usedDiskSpace });
    } catch (error) {
        if (error instanceof AuthError) {
            return res.status(error.status).json({ message: error.message });
        }

        res.status(500).json({ message: 'Service error. Please, try later' });
    }
};

exports.getUserAvatarController = async (req, res) => {
    try {
        const userAvatarFilePath = await readUserAvatarService(req.user.id);

        res.status(200).sendFile(userAvatarFilePath);
    } catch (error) {
        if (error instanceof FileError) {
            return res.status(error.status).json({ message: error.message });
        }

        res.status(500).json({ message: 'Service error. Please, try later' });
    }
};

exports.uploadUserAvatarController = async (req, res) => {
    if (!req.files) {
        return;
    }

    try {
        await uploadUserAvatarService(req.user.id, req.files.file);

        res.sendStatus(200);
    } catch (error) {
        if (error instanceof FileError) {
            return res.status(error.status).json({ message: error.message });
        }

        res.status(500).json({ message: 'Service error. Please, try later' });
    }
};
