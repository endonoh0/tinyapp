const { assert } = require('chai');
const { verifyUser } = require('../helpers.js');
const { users } = require('../database');

describe('verifyUser', function () {
    it('should return a user with valid email', function () {
        const user = verifyUser("user@example.com", users);
        const result = user.id;
        const expectedOutput = "aJ48lW";

        assert.equal(result, expectedOutput);
    });

    it('should return false with an invalid email', function () {
        const result = verifyUser("fake@example.com", users);

        assert.equal(result, false);
    });

    it('should return an user\'s email with a valid id', function () {
        const user = verifyUser("user2RandomID", users);
        const result = user.email;
        const expectedOutput = "user2@example.com";

        assert.equal(result, expectedOutput);
    });

    it('should return false with an invalid id', function () {
        const result = verifyUser("fakeID", users);

        assert.equal(result, false);
    });
});
