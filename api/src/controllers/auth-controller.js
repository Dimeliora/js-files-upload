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
