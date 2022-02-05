const getPostfixedFileName = (fileslist, filename, postfix = 0) => {
    let newFilename = filename;
    if (postfix > 0) {
        const filenameParts = newFilename.split(".");
        const ext = filenameParts.pop();
        newFilename = `${filenameParts.join(".")}-(${postfix}).${ext}`;
    }

    if (!fileslist.includes(newFilename)) {
        return newFilename;
    }

    return getPostfixedFileName(fileslist, filename, postfix + 1);
};

module.exports = {
    getPostfixedFileName,
};
