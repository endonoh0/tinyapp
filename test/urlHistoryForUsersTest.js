const { assert } = require('chai');
const { urlHistoryForUsers } = require('../helpers.js');
const { urlDatabase } = require('../database');

describe('urlHistoryForUsers', function () {
    it('should return an empty object with invalid user id', function () {
        const result = urlHistoryForUsers("user2RandomID", urlDatabase);

        assert.isNull(result);
    });

    it('should return a collection of URL history with a valid user id', function () {
        const result = urlHistoryForUsers("aJ48lW", urlDatabase);
        console.log(result);
        const expectedOutput = {
            b6UTxQ: {
                history: [{ visitorID: 'd92s9f', date: '2020-06-13T22:40:47.315Z' }]
            },
            i3BoGr: {
                history: [{ visitorID: '03sdm3', date: '2020-06-13T22:40:47.315Z' }]
            }
        }

        assert.deepEqual(result, expectedOutput);
    });
});
