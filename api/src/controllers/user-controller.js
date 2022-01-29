const { getUserDataService } = require('../services/user-service');

exports.getUserDataController = async (req, res) => {
    const { id } = req.user;

    try {
        const userData = await getUserDataService(id);

        res.status(200).json({
            username: userData.username,
            email: userData.email,
            totalDiskSpace: userData.totalDiskSpace,
            usedDiskSpace: userData.usedDiskSpace,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            return res.status(error.status).json({ message: error.message });
        }

        res.status(500).json({ message: 'Service error. Please, try later' });
    }
};