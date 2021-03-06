const express = require('express');
const app = module.exports = express();
const { urlDatabase } = require('../database');

/**
 * Update the specified resource.
 */
app.put('/urls/:shortURL/update', (req, res) => {
    const shortURL = req.params.shortURL;
    const id = req.session.user_id;
    let longURL = req.body.longURL;

    if (!id || urlDatabase[shortURL].userID !== id) {
        res.status(403).send('You do not have permission.')
    }

    if (!longURL.includes("http://")) {
        longURL = `http://${longURL}`;
    }

    urlDatabase[shortURL].longURL = longURL;
    res.redirect('/urls');
});
