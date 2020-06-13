const express = require('express');
const app = module.exports = express();
const { urlDatabase } = require('../database');

/**
 * Redirect to the specified resource.
 */
app.get('/u/:shortURL', (req, res) => {
    const shortURL = req.params.shortURL;

    if (!urlDatabase[shortURL]) {
        return res.status(404).send('Page not found');
    }

    const longURL = urlDatabase[shortURL].longURL;
    res.redirect(longURL);
});
