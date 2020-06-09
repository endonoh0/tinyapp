const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({exended: true}));

const { generateRandomString } = require('./helpers.js');

const urlDatabase = {
    S15tx: { longURL: "https://tsn.ca" },
    b2xVn2: { longURL: "http://www.lighthouselabs.ca" },
    PsWtqZ: { longURL: "https://google.ca" }
};

/**
 * Display a listing of the resource
 */
app.get('/urls', (req, res) => {
    const templateVars = urlDatabase;

    res.render('urls_index', {
        urls: templateVars
    });
});

/**
 * Store a newly created resource in database.
 */
app.post("/urls", (req, res) => {
    const shortURL = generateRandomString();

    urlDatabase[shortURL] = {
        longURL: req.body.longURL
    };

    res.redirect(`/urls/${shortURL}`);
});

/**
 * Show the form for creating a new resource.
 */
app.get('/urls/new', (req, res) => {
    res.render('urls_new');
});

/**
 * Redirect to the specified resource.
 */
app.get("/u/:shortURL", (req, res) => {
    const longURL = urlDatabase[req.params.shortURL].longURL;
    res.redirect(longURL);
});

/**
 * Display the specifed resource.
 */
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
