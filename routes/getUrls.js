const express = require('express');
const app = module.exports = express();
const { verifyUser, urlsForUsers } = require('../helpers');
const { users, urlDatabase } = require('../database');

/**
 * Display a listing of the resource
 */
app.get('/urls', (req, res) => {
    const id = req.session.user_id;

    if (!id) {
        res.render('urls_index', {
            user: null,
            errorMessage: 'Please sign in or register to view this page.'
        })
    } else {
        res.render('urls_index', {
            user: verifyUser(id, users),
            urls: urlsForUsers(id, urlDatabase),
            errorMessage: null
        });
    }
});
