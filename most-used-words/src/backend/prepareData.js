module.exports = rows => {
    return new Promise((resolver, reject) => {
        try {
            const words = rows
                .filter(isValidRow)
                .map(removePunctuation)
                .map(removeTags)
                .reduce(mergeRows)
                .split(' ')
                .map(word => word.toLowerCase())
                .map(removeCharsInvalidOfRow)
                .map(removeInvalidHyphen);
            resolver(words);
        } catch (e) {
            reject(e);
        }
    });
};

function isValidRow(row) {
    const notNumber = !parseInt(row.trim());
    const notEmpty = !!row.trim();
    const notInterval = !row.includes(' --> ');
    return notNumber && notEmpty && notInterval;
}

function removeCharsInvalidOfRow(row) {
    return charsInvalidOfRowRemove.reduce((row, char) => {
        return row.replace(char, '');
    }, row);
}

function removeInvalidHyphen(row) {
    if (row.startsWith("-")) {
        row = removeInvalidHyphen(row.substr(1));
    }
    if (row.endsWith("-")) {
        row = removeInvalidHyphen(row.substr(0, row.length - 1));
    }
    return row;
}

const removePunctuation = row => row.replace(/[,?!.]/g, '');
const removeTags = row => row.replace(/(<[^>]+)>/ig, '').trim();
const mergeRows = (fullText, row) => `${fullText} ${row}`;
const charsInvalidOfRowRemove = ['"', '\'', ":", ' -'];