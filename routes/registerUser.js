const express = require('express');
const app = module.exports = express()
const bcrypt = require('bcrypt');
const { generateRandomString, verifyUser } = require('../helpers');
const { users } = require('../database');

/**
 * Register a new user.
 */
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    const user = verifyUser(email, users);

    if (email === '' || password === '') {
        return res.status(400).send('Please fill in email or password');
    } else if (user.email === email) {
        return res.status(400).send('This email already exists');
    } else {
        const userID = generateRandomString();
        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = {
            id: userID,
            email: email,
            password: hashedPassword
        };
        users[userID] = newUser;

        req.session.user_id = userID;
        res.redirect('/urls');
    }
});
