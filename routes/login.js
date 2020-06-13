const express = require('express');
const app = module.exports = express();

/**
 * Display the form to login.
 */
app.get('/login', (req, res) => {
    if (!req.session.user_id) {
        res.render('pages/login', { user: null });
    }

    res.redirect('/urls');
});
