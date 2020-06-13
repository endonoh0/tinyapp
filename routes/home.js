const express = require('express');
const app = module.exports = express();

/**
 * Display the home page.
 *
 */
app.get('/', (req, res) => {
    if (!req.session.user_id) {
        res.render('pages/login', { user: null });
    }

    res.redirect('/urls');
});
