const express = require('express');
const bcrypt = require('bcrypt');
const app = module.exports = express();
const { verifyUser } = require('../helpers');
const { users } = require('../database');

/**
 * Store a created user in session.
 */
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = verifyUser(email, users);

    if (!user) {
        return res.status(403).send('Incorrect email or password.');
    } else if (!bcrypt.compareSync(password, user.password)) {
        return res.status(403).send('Incorrect email or password.');
    } else {
        req.session.user_id = user.id;
        res.redirect('/urls');
    }
});
