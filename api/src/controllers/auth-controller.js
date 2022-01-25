const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/user-model');
const { createUserDir } = require('../services/fs-service');

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

exports.auth = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).exec();
        if (!user) {
            return res.status(401).json({ message: 'User is not authorized' });
        }

        sendAuthorizedUser(res, user);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.passwordHash
        );
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        sendAuthorizedUser(res, user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Invalid credentials',
                errors: errors.errors,
            });
        }

        const { username, email, password } = req.body;

        const candidate = await User.findOne({ email }).exec();
        if (candidate) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(8);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({ username, email, passwordHash });
        await user.save();

        await createUserDir(user._id.toString());

        sendAuthorizedUser(res, user);
    } catch (error) {
        res.status(500).json({ message: 'Service error. Please, try later' });
    }
};
