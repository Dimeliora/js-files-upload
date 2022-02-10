const SIZE_UNITS = ["B", "KB", "MB"];

export const getFormattedFileSize = (size, exp = 0) => {
    return size > 1024
        ? getFormattedFileSize(size / 1024, exp + 1)
        : `${size.toFixed(exp === 0 ? 0 : 1)}${SIZE_UNITS[exp]}`;
};

export const getFormattedPassedTime = (date) => {
    const pluralEnding = (value) => (value > 1 ? "s" : "");

    const secondsPassed = Math.floor((Date.now() - Date.parse(date)) / 1000);
    if (secondsPassed > 60 * 60 * 24) {
        const days = Math.floor(secondsPassed / (60 * 60 * 24));
        return `${days} day${pluralEnding(days)} ago`;
    }

    if (secondsPassed > 60 * 60) {
        const hrs = Math.floor(secondsPassed / (60 * 60));
        return `${hrs} hour${pluralEnding(hrs)} ago`;
    }

    if (secondsPassed > 60) {
        const mins = Math.floor(secondsPassed / 60);
        return `${mins} minute${pluralEnding(mins)} ago`;
    }

    return `${secondsPassed} second${pluralEnding(secondsPassed)} ago`;
};
