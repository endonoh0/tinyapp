const { assert } = require('chai');
const { urlHistoryForUsers } = require('../helpers.js');
const { urlDatabase } = require('../database');

describe('urlHistoryForUsers', function () {
    it('should return an empty history array for a valid id with no history', function () {
        const result = urlHistoryForUsers("3ksl3d", urlDatabase);
        const expectedOutput = {
            "kd29ds": {
                history: []
                }
            }

        assert.deepEqual(result, expectedOutput);
    });

    it('should return a collection of URL history with a valid user id', function () {
        const result = urlHistoryForUsers("aJ48lW", urlDatabase);
        console.log(result);
        const expectedOutput = {
            b6UTxQ: {
                history: [
                    { visitorID: 'd92s9f', date: '2020-06-13T22:40:47.315Z' },
                    { visitorID: "d92s9f", date: "2020-06-13T22:40:47.315Z" },
                    { visitorID: "asd20d", date: "2020-06-13T22:40:47.315Z"}
                ]},
            i3BoGr: {
                history: [{ visitorID: "sws9f", date: '2020-06-13T22:40:47.315Z' }]
            }}

        assert.deepEqual(result, expectedOutput);
    });
});
