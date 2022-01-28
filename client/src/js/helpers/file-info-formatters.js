export const getFormattedFileSize = (size) => {
    if (size > 1024 ** 2) {
        return (size / 1024 ** 2).toFixed(1) + 'MB';
    }

    if (size > 1024 ** 1) {
        return (size / 1024 ** 1).toFixed(1) + 'KB';
    }

    return size + 'B';
};

export const getFormattedFileCreationDate = (date) => {
    const secondsPassed = Math.floor((Date.now() - Date.parse(date)) / 1000);
    if (secondsPassed > 60 * 60 * 24) {
        return `${Math.floor(secondsPassed / (60 * 60 * 24))} days ago`;
    }

    if (secondsPassed > 60 * 60) {
        return `${Math.floor(secondsPassed / (60 * 60))} hours ago`;
    }

    if (secondsPassed > 60) {
        return `${Math.floor(secondsPassed / 60)} minutes ago`;
    }

    return `${secondsPassed} seconds ago`;
};
