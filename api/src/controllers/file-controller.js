const FileError = require("../errors/file-error");
const AuthError = require("../errors/auth-error");
const {
    fileUploadAbilityCheckService,
    fileUploadService,
    getFilesService,
    downloadFileService,
    deleteFilesService,
} = require("../services/file-service");
const { validateUser } = require("../services/auth-service");

exports.fileUploadAbilityCheckController = async (req, res) => {
    try {
        await fileUploadAbilityCheckService(req.user.id, req.body.size);

        res.sendStatus(200);
    } catch (error) {
        if (error instanceof FileError) {
            return res.status(error.status).json({ message: error.message });
        }

        res.status(500).json({ message: "Service error. Please, try later" });
    }
};

exports.fileUploadController = async (req, res) => {
    try {
        if (!req.files) {
            throw new FileError("File expected", 400);
        }

        await fileUploadService(req.user.id, req.files.file);

        res.sendStatus(201);
    } catch (error) {
        if (error instanceof FileError) {
            return res.status(error.status).json({ message: error.message });
        }

        res.status(500).json({ message: "Service error. Please, try later" });
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

        res.status(500).json({ message: "Service error. Please, try later" });
    }
};

exports.downloadFileController = async (req, res) => {
    try {
        const userId = await validateUser(req.query.access_token);

        const filePath = await downloadFileService(userId, req.params.fileId);

        res.status(200).download(filePath);
    } catch (error) {
        if (error instanceof FileError || error instanceof AuthError) {
            return res.status(error.status).json({ message: error.message });
        }

        res.status(500).json({ message: "Service error. Please, try later" });
    }
};

exports.deleteFilesController = async (req, res) => {
    try {
        await deleteFilesService(req.user.id, req.body.filesToDelete);

        res.sendStatus(200);
    } catch (error) {
        if (error instanceof FileError || error instanceof AuthError) {
            return res.status(error.status).json({ message: error.message });
        }

        res.status(500).json({ message: "Service error. Please, try later" });
    }
};
