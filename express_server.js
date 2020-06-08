const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');
app.use(morgan('dev'));


// url index page
app.get('/urls', (req, res) => {
    const templateVars = {
        12345: "https://google.com"
    }

    res.render('urls_index', {
        urls: templateVars
    });
});

// login page
app.get('/', (req, res) => {
    const name = 'John Doe';

    res.render('pages/login', {
        name: name
    });
});

// register page
app.get('/register', (req, res) => {
    res.render('pages/register');
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
