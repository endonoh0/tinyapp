const { assert } = require('chai');
const { verifyUser } = require('../helpers.js');

const testUsers = {
    "userRandomID": {
        id: "userRandomID",
        email: "user@example.com",
        password: "purple-monkey-dinosaur"
    },
    "user2RandomID": {
        id: "user2RandomID",
        email: "user2@example.com",
        password: "dishwasher-funk"
    }
};

describe('verifyUser', function () {
    it('should return a user with valid email', function () {
        const user = verifyUser("user@example.com", testUsers);
        const result = user.id;
        const expectedOutput = "userRandomID";

        assert.equal(result, expectedOutput);
    });

    it('should return false with an invalid email', function () {
        const result = verifyUser("fake@example.com", testUsers);

        assert.equal(result, false);
    });

    it('should return an user\'s email with a valid id', function () {
        const user = verifyUser("user2RandomID", testUsers);
        const result = user.email;
        const expectedOutput = "user2@example.com";

        assert.equal(result, expectedOutput);
    });

    it('should return false with an invalid id', function () {
        const result = verifyUser("fakeID", testUsers);

        assert.equal(result, false);
    });
});
