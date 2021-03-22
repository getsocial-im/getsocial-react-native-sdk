/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable no-undef */
const fs = require('fs');

function readTestData(dir, filename) {
    const filePath = './../../jsonbridge-testdata/' + dir + '/' + filename;
    return fs.readFileSync(filePath, 'utf8');
}

function saveResult(dir, filename, result) {
    const dirPath = './__tests__/output/' + dir;
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
    const filePath = dirPath + '/' + filename;
    fs.writeFileSync(filePath, result);
}

module.exports = {saveResult, readTestData};

// hack, because cannot be ignored, because ....
test('true == true', () => {
    expect(true == true);
});
