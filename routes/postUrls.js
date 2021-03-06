const express = require('express');
const app = module.exports = express();
const { generateRandomString } = require('../helpers');
const { urlDatabase } = require('../database');

/**
 * Store a newly created resource in database.
 */
app.post('/urls', (req, res) => {
    const shortURL = generateRandomString();
    let longURL = req.body.longURL;

    if (!longURL.includes("http://")) {
        longURL = `http://${longURL}`;
    }

    urlDatabase[shortURL] = {
        longURL: longURL,
        userID: req.session.user_id,
        history: []
    };
    res.redirect(`/urls/${shortURL}`);
});
