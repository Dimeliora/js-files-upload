const path = require('path');
const fs = require('fs/promises');

const { getUserFilesDir } = require('../helpers/data-path-helpers');

exports.createUserDir = async (userId) => {
    const userFilesDirPath = getUserFilesDir(userId);

    try {
        await fs.mkdir(userFilesDirPath, { recursive: true });
    } catch (error) {
        throw new Error(error.message);
    }
};
