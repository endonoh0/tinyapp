const { assert } = require('chai');
const {urlsForUsers } = require('../helpers.js');

const testUrlDatabase = {
    b6UTxQ: { longURL: "https://www.tsn.ca", userID: "aJ48lW" },
    i3BoGr: { longURL: "https://www.hotmail.ca", userID: "aJ48lW" },
    kjadf0: { longURL: "https://www.google.ca", userID: "kad29" },
    adf929: { longURL: "https://www.yahoo.ca", userID: "asdf93" }
};

describe('urlsForUsers', function () {
    it('should return an empty object for users with no URLs', function () {
        const result = urlsForUsers("user2RandomID", testUrlDatabase);

        assert.isEmpty(result);
    });

    it('should return an empty object with invalid user id', function () {
        const result = urlsForUsers("user2RandomID", testUrlDatabase);

        assert.isEmpty(result);
    });

    it('should return a list of URLs for users who owns them', function () {
        const result = urlsForUsers("aJ48lW", testUrlDatabase);
        console.log(result);
        const expectedOutput = {
            b6UTxQ: { longURL: 'https://www.tsn.ca' },
            i3BoGr: { longURL: 'https://www.hotmail.ca' }
        };

        assert.deepEqual(result, expectedOutput);
    });
});
