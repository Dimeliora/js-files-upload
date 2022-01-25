const bcrypt = require('bcryptjs');

const User = require('../models/user-model');

exports.auth = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ msg: 'User is not authorized' });
        }

        const accessToken = user.generateToken();

        res.status(200).json({
            accessToken,
            user,
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.passwordHash
        );
        if (!isPasswordValid) {
            return res.status(401).json({ msg: 'Invalid Password' });
        }

        const accessToken = user.generateToken();

        res.status(200).json({
            accessToken,
            user,
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
