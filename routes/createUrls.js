const express = require('express');
const app = module.exports = express();
const { users } = require('../database');

/**
 * Show the form to create a new resource.
 */
app.get('/urls/new', (req, res) => {
    const id = req.session.user_id;

    if (!id) {
        res.redirect('/login');
    } else {
        const user = users[id];
        res.render('urls_new', { user });
    }
});
