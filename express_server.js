const { generateRandomString } = require('./helpers');
const express = require('express');
const app = express();
const PORT = 8080;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ exended: true }));

// login page
app.get('/', (req, res) => {
    const name = 'John Doe';

    res.render('pages/login', {
        name: name
    });
});

app.post('/login', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/urls');
})

// register page
app.get('/register', (req, res) => {
    res.render('pages/register');
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});

const urlDatabase = {
    "S15tx8": { longURL: "https://tsn.ca" },
    "b2xVn2": { longURL: "http://www.lighthouselabs.ca" },
    "9sm5xK": { longURL: "https://google.ca" }
};

app.get('urls.json', (req, res) => {
    res.json(urlDatabase);
})

/**
 * Display a listing of the resource
 */
app.get('/urls', (req, res) => {
    res.render('urls_index', {
        urls: urlDatabase
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
    const shortURL = req.params.shortURL;

    if(!urlDatabase[shortURL]) {
        return res.status(404).send('Not Found');
    }
    const longURL = urlDatabase[shortURL].longURL;

    res.redirect(longURL);
});

/**
 * Display the specified resource.
 */
app.get("/urls/:shortURL", (req, res) => {
    const shortURL = req.params.shortURL;

    let templateVars = {
        shortURL: shortURL,
        longURL: urlDatabase[shortURL]
    };

    res.render("urls_show", templateVars);
});

/**
 * Delete the specified resource.
 */
app.post('/urls/:shortURL/delete', (req, res) => {
    const shortURL = req.params.shortURL
    delete urlDatabase[shortURL];
    res.redirect('/urls');
});

/**
 * Update the specified resource.
 */
app.post('/urls/:shortURL/update', (req, res) => {
    const shortURL = req.params.shortURL;

    urlDatabase[shortURL].longURL = req.body.longURL;
    res.redirect('/urls');
});
