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
    // Set visitor ID
    let visitorID = id;

    if (!urlDatabase[shortURL]) {
        return res.status(404).send('Page not found');
    }

    if (!id) {
        visitorID = generateRandomString();
        // req.sesssion.visitorID = visitorID;
    }

    const visitInfo = {
        visitorID: visitorID,
        date: new Date()
    }

    urlDatabase[shortURL]["history"].push(visitInfo);

    const longURL = urlDatabase[shortURL].longURL;
    res.redirect(longURL);
});
