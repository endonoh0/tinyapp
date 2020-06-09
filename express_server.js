const { generateRandomString } = require('./helpers.js');
const express = require('express');
const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');
app.use(require('./middlewares.js'));

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
    if(!urlDatabase[req.params.shortURL]) {
        return res.status(404).send('Not Found');
    }
    const longURL = urlDatabase[req.params.shortURL].longURL;

    res.redirect(longURL);
});

/**
 * Display the specified resource.
 */
app.get("/urls/:shortURL", (req, res) => {
    let templateVars = {
        shortURL: req.params.shortURL,
        longURL: urlDatabase[req.params.shortURL]
    };

    res.render("urls_show", templateVars);
});

/**
 * Delete the specified resource.
 */
app.post('/urls/:shortURL/delete', (req, res) => {
    delete urlDatabase[req.params.shortURL];
    res.redirect('/urls');
});

/**
 * Update the specified resource.
 */
app.post('/urls/:shortURL/update', (req, res) => {
    urlDatabase[req.params.shortURL].longURL = req.body.longURL;
    res.redirect('/urls');
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
