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

const { generateRandomString, verifyUser} = require('./helpers');

const urlDatabase = {
    "S15tx8": { longURL: "https://tsn.ca" },
    "b2xVn2": { longURL: "http://www.lighthouselabs.ca" },
    "9sm5xK": { longURL: "https://google.ca" }
};

const users = {
    "userRandomID": {
        id: "userRandomID",
        email: "user@example.com",
        password: "purple-monkey-dinosaur"
    },
    "user2RandomID": {
        id: "user2RandomID",
        email: "user2@example.com",
        password: "dishwasher-funk"
    }
}

/**
 * Display the home page.
 */
app.get('/', (req, res) => {
    res.redirect('urls');
});

/**
 * Display the form to register.
 */
app.get('/register', (req, res) => {
    res.render('pages/register');
});

/**
 * Register a new user.
 */
app.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = verifyUser(email, users);

    // validation
    if (email === '' || password === '') {
        res.status(400).send('Please fill in email or password');
    } else if (user.email === email) {
        res.status(400).send('This email already exists.');
    } else {
        const userID = generateRandomString;
        users[userID] = {
            id: userID,
            email: email,
            password: req.body.password // hash
        };
        res.cookie('user_id', userID);
        res.redirect('/urls');
    }
});

/**
 * Display the form to login.
 */
app.get('/login', (req, res) => {
    res.render('pages/login');
});

/**
 * Store a created user in session.
 */
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = verifyUser(email, users);

    if (!user) {
        res.status(403).send('This email does not exist');
    } else if (user.password !== password) {
        res.status(403).send('Incorrect password');
    } else {
        res.cookie('user_id', user.id);
        res.redirect('/urls');
    }
});

/**
 * Logout the user.
 */
app.post('/logout', (req, res) => {
    res.clearCookie('user_id');
    res.redirect('/urls');
});

/**
 * Display a listing of the resource
 */
app.get('/urls', (req, res) => {
    const user = req.cookies["user_id"];

    console.log(req.cookies);
    res.render('urls_index', {
        urls: urlDatabase,
        user: users[user]
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
 * Show the form to create a new resource.
 */
app.get('/urls/new', (req, res) => {

    const id = req.cookies["user_id"];
    const user = users[id];

    res.render('urls_new', {user});
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
    const user = req.cookies["user_id"];

    let templateVars = {
        shortURL: shortURL,
        longURL: urlDatabase[shortURL],
        user: users[user]
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
