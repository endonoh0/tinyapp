const express = require('express');
const app = module.exports = express();
const { users, urlDatabase } = require('../database');
const { urlHistoryForUsers } = require('../helpers');

/**
 * Display the specified resource.
 */
app.get('/urls/:shortURL', (req, res) => {
    const shortURL = req.params.shortURL;
    const id = req.session.user_id;

    if (!id) {
        return res.render('urls_show', {
            user: null,
            errorMessage: 'Please sign in or register to view this page.'
        });
    } else if (!urlDatabase[shortURL]) {
        return res.status(404).send('Not Found');
    } else if (urlDatabase[shortURL].userID !== id) {
        return res.render("urls_show", {
            user: null,
            errorMessage: 'You do not have permission to view this page.'
        });
    }
    const urlHistory = urlHistoryForUsers(id, urlDatabase);
    const urlInfo = urlHistory[shortURL];

        res.render('urls_show', {
            shortURL: shortURL,
            longURL: urlDatabase[shortURL],
            user: users[id],
            urlInfo
        });
});
