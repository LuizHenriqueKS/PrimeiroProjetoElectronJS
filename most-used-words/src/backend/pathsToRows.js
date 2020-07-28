const fs = require('fs');

module.exports = paths => {
    return new Promise((resolver, reject) => {
        try {
            const rows = paths
                .map(path => fs.readFileSync(path, { encoding: 'latin1' }).toString())
                .reduce((fullText, fileText) => `${fullText}\n${fileText}`)
                .replace('\r\n', '\n')
                .split('\n');
            resolver(rows);
        } catch (e) {
            reject(e);
        }
    });
};