const { assert } = require('chai');
const { generateRandomString } = require('../helpers.js');

describe('generateRandomString', function () {
    it('should return a random six character string', function () {
        const string = generateRandomString();
        const result = string.length;
        const expectedOutput = 6;

        assert.equal(result, expectedOutput);
    });
});
