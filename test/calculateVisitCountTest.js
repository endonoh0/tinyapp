const { assert } = require('chai');
const { calculateVisitCount } = require('../helpers.js');

describe('calculateVisitCount', function () {
    it('should return 1 unique and 1 total visitors with the given url history', function () {
        const urlHistory = {
            history:
                [{ visitorID: "d92s9f", date: "2020-06-13T22:40:47.315Z" }]
        };

        const result = calculateVisitCount(urlHistory);
        const expectedOutput = { total: 1, unique: 1 };

        assert.deepEqual(result, expectedOutput);
    });

    it('should return 0 unique and 0 total visitors for a given url with no history', function () {
        const urlHistory = {
            history: []
        };

        const result = calculateVisitCount(urlHistory);
        const expectedOutput = { total: 0, unique: 0 };

        assert.deepEqual(result, expectedOutput);
    });

    it('should return 3 total and 1 unique visitors with a given url history', function () {
        const urlHistory = {
            history:
                [{ visitorID: "d92s9f", date: "2020-06-13T22:40:47.315Z" },
                { visitorID: "d92s9f", date: "2020-06-13T22:40:47.315Z" },
                { visitorID: "asd20d", date: "2020-06-13T22:40:47.315Z" }]
        };

        const result = calculateVisitCount(urlHistory);
        const expectedOutput = { total: 3, unique: 1 };

        assert.deepEqual(result, expectedOutput);
    });

    it('should return 5 total and 4 unique visitors with a given url history', function () {
        const urlHistory = {
            history:
                [{ visitorID: "d92s9f", date: "Sun Jun 14 2020"},
                { visitorID: "jdj29d", date: "Sun Jun 14 2020"},
                { visitorID: "asd20d", date: "Sun Jun 14 2020"},
                { visitorID: "2d02md", date: "Sun Jun 14 2020"},
                { visitorID: "asd20d", date: "Sun Jun 14 2020"}]
        };

        const result = calculateVisitCount(urlHistory);
        const expectedOutput = { total: 5, unique: 4 };

        assert.deepEqual(result, expectedOutput);
    });
});
