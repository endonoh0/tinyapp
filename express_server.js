const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { generateRandomString } = require('./helpers.js');
const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({exended: true}));

const urlDatabase = {
    S15tx: { longURL: "https://tsn.ca" },
    b2xVn2: { longURL: "http://www.lighthouselabs.ca" },
    PsWtqZ: { longURL: "https://google.ca" }
};

// show url index page
app.get('/urls', (req, res) => {
    const templateVars = urlDatabase;

    res.render('urls_index', {
        urls: templateVars
    });
});

// create the new url
app.post("/urls", (req, res) => {
    const shortURL = generateRandomString();
    // generate random url
    urlDatabase[shortURL] = {
        longURL: req.body.longURL
    };

    console.log(req.body);  // Log the POST request body to the console
    res.redirect(`/urls/${shortURL}`);
});

// show a view to create a new url
app.get('/urls/new', (req, res) => {
    res.render('urls_new');
});

// redirect to long URL if accessing short URL
app.get("/u/:shortURL", (req, res) => {
    const longURL = urlDatabase[req.params.shortURL].longURL;
    res.redirect(longURL);
});

// show the specified url
app.get("/urls/:shortURL", (req, res) => {
    let templateVars = {
        shortURL: req.params.shortURL,
        longURL: urlDatabase[req.params.shortURL]
    };

    res.render("urls_show", templateVars);
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
