export const getFormattedFileSize = (size) => {
    if (size > 1024 ** 2) {
        return (size / 1024 ** 2).toFixed(1) + 'MB';
    }

    if (size > 1024 ** 1) {
        return (size / 1024 ** 1).toFixed(1) + 'KB';
    }

    return size + 'B';
};

export const getFormattedPassedTime = (date) => {
    const pluralEnding = (value) => (value > 1 ? 's' : '');

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
