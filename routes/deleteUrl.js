const express = require('express');
const app = module.exports = express();
const { urlDatabase } = require('../database');

/**
 * Delete the specified resource.
 */
app.delete('/urls/:shortURL/delete', (req, res) => {
    const shortURL = req.params.shortURL;
    const id = req.session.user_id;

    if (!id || urlDatabase[shortURL].userID !== id) {
        res.status(403).send('You do not have permission.')
    } else {
        delete urlDatabase[shortURL];
        res.redirect('/urls');
    }
});
