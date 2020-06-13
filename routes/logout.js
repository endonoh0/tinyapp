const express = require('express');
const app = module.exports = express();

/**
 * Logout the user.
 */
app.post('/logout', (req, res) => {
    req.session = null;
    res.redirect('/urls');
});
