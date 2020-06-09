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

const urlDatabase = {
    "S15tx8": { longURL: "https://tsn.ca" },
    "b2xVn2": { longURL: "http://www.lighthouselabs.ca" },
    "9sm5xK": { longURL: "https://google.ca" }
};

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


// login page
app.get('/', (req, res) => {
    const name = 'John Doe';

    res.render('pages/login', {
        name: name
    });
});

/**
 * Store a newly created username in session.
 */
app.post('/login', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/urls');
});

/**
 * Logout the user.
 */
app.post('/logout', (req, res) => {
    res.clearCookie('username');
    res.redirect('/urls');
});

// register page
app.get('/register', (req, res) => {
    res.render('pages/register');
})


app.get('urls.json', (req, res) => {
    res.json(urlDatabase);
})

/**
 * Display a listing of the resource
 */
app.get('/urls', (req, res) => {
    const username = req.cookies["username"];

    console.log(req.cookies);
    res.render('urls_index', {
        urls: urlDatabase,
        username
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
    const username = req.cookies["username"];

    res.render('urls_new', {username});
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
        longURL: urlDatabase[shortURL],
        username: req.cookies["username"]
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

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
