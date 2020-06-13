const express = require('express');
const app = module.exports = express();
const { generateRandomString } = require('../helpers');
const { urlDatabase } = require('../database');

/**
 * Store a newly created resource in database.
 */
app.post('/urls', (req, res) => {
    const shortURL = generateRandomString();

    urlDatabase[shortURL] = {
        longURL: req.body.longURL,
        userID: req.session.user_id
    };
    res.redirect(`/urls/${shortURL}`);
});
