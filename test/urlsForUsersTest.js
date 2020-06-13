const { assert } = require('chai');
const {urlsForUsers } = require('../helpers.js');
const { urlDatabase } = require('../database');

describe('urlsForUsers', function () {
    it('should return an empty object for users with no URLs', function () {
        const result = urlsForUsers("user2RandomID", urlDatabase);

        assert.isEmpty(result);
    });

    it('should return an empty object with invalid user id', function () {
        const result = urlsForUsers("user2RandomID", urlDatabase);

        assert.isEmpty(result);
    });

    it('should return a list of URLs for users who owns them', function () {
        const result = urlsForUsers("aJ48lW", urlDatabase);
        const expectedOutput = {
            b6UTxQ: { longURL: "https://www.tsn.ca" },
            i3BoGr: { longURL: 'https://www.google.ca' }
        };

        assert.deepEqual(result, expectedOutput);
    });
});
