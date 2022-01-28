const { validationResult } = require('express-validator');

const AuthError = require('../errors/auth-error');
const {
    authService,
    loginService,
    registerService,
} = require('../services/auth-service');

const sendAuthorizedUser = (res, userDocument) => {
    const accessToken = userDocument.generateToken();
    const userData = {
        id: userDocument._id,
        username: userDocument.username,
        email: userDocument.email,
        totalDiskSpace: userDocument.totalDiskSpace,
        usedDiskSpace: userDocument.usedDiskSpace,
    };

    res.status(200).json({
        accessToken,
        user: userData,
    });
};

exports.authController = async (req, res) => {
    const { id } = req.user;

    try {
        const userData = await authService(id);

        sendAuthorizedUser(res, userData);
    } catch (error) {
        if (error instanceof AuthError) {
            return res.status(error.status).json({ message: error.message });
        }

        res.status(500).json({ message: 'Service error. Please, try later' });
    }
};

exports.loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userData = await loginService(email, password);

        sendAuthorizedUser(res, userData);
    } catch (error) {
        if (error instanceof AuthError) {
            return res.status(error.status).json({ message: error.message });
        }

        res.status(500).json({ message: 'Service error. Please, try later' });
    }
};

exports.registerController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Invalid credentials',
            errors: errors.errors,
        });
    }

    const { username, email, password } = req.body;

    try {
        const userData = await registerService(username, email, password);

        sendAuthorizedUser(res, userData);
    } catch (error) {
        if (error instanceof AuthError) {
            return res.status(error.status).json({ message: error.message });
        }

        res.status(500).json({ message: 'Service error. Please, try later' });
    }
};
