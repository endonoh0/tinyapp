const { assert } = require('chai');
const { calculateVisitCount } = require('../helpers.js');

describe('calculateVisitCount', function () {
    it('should return the number of total and unique visiters for a given url history', function () {
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

    it('should return the number of total and unique visiters for a given history', function () {
        const urlHistory = {
            history:
                [{ visitorID: "d92s9f", date: "2020-06-13T22:40:47.315Z" },
                { visitorID: "jdj29d", date: "2020-06-13T22:40:47.315Z" },
                { visitorID: "asd20d", date: "2020-06-13T22:40:47.315Z" },
                { visitorID: "2d02md", date: "2020-06-13T22:40:47.315Z" },
                { visitorID: "asd20d", date: "2020-06-13T22:40:47.315Z" }]
        };

        const result = calculateVisitCount(urlHistory);
        const expectedOutput = { total: 5, unique: 4 };

        assert.deepEqual(result, expectedOutput);
    });
});
