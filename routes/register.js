const express = require('express');
const app = module.exports = express();

/**
 * Display the form to register.
 */
app.get('/register', (req, res) => {
    if (!req.session.user_id) {
        res.render('pages/register', { user: null });
    }
    res.redirect('/urls');
});
