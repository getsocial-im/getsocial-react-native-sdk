/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable no-undef */
const fs = require('fs');

function readEncodedObject(dir, filename) {
    const filePath = './../../jsonbridge-testdata/wrapper_to_native/' + dir + '/' + filename;
    return fs.readFileSync(filePath, 'utf8');
}

function readObjectToDecode(filename) {
    const filePath = './../../jsonbridge-testdata/native_to_wrapper/' + filename;
    return fs.readFileSync(filePath, 'utf8');
}

module.exports = {readEncodedObject, readObjectToDecode};

// hack, because cannot be ignored, because ....
test('true == true', () => {
    expect(true == true);
});
