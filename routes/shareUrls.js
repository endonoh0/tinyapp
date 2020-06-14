const express = require('express');
const app = module.exports = express();
const { urlDatabase } = require('../database');
const { generateRandomString } = require('../helpers');


/**
 * Redirect to the specified resource.
 */
app.get('/u/:shortURL', (req, res) => {
    const shortURL = req.params.shortURL;
    const id = req.session.user_id;
    let visitorID = id;

    if (!urlDatabase[shortURL]) {
        return res.status(404).send('Page not found');
    }

    if (!id) {
        visitorID = generateRandomString();
    }

    let time = new Date();
    let date = time.toDateString();

    const visitInfo = {
        visitorID: visitorID,
        date: date
    }

    urlDatabase[shortURL]["history"].push(visitInfo);

    const longURL = urlDatabase[shortURL].longURL;
    res.redirect(longURL);
});
