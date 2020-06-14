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
                    { visitorID: 'd92s9f', date: 'Sun Jun 14 2020' },
                    { visitorID: "d92s9f", date: "Sun Jun 14 2020" },
                    { visitorID: "asd20d", date: "Sun Jun 14 2020"}
                ]},
            i3BoGr: {
                history: [{ visitorID: "sws9f", date: 'Sun Jun 14 2020' }]
            }}

        assert.deepEqual(result, expectedOutput);
    });
});
