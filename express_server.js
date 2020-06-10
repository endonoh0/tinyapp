const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 8080;
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ exended: true }));
app.use(cookieParser());

const { generateRandomString, verifyUser, urlsForUsers} = require('./helpers');

const urlDatabase = {
    "asdf2d": { longURL: "https://tsn.ca", userID: "S15tx8" },
    "b2xVn2": { longURL: "http://www.lighthouselabs.ca", userID: "S15tx8" },
    "9sm5xK": { longURL: "https://google.ca", userID: "9sm5xK" }
};

const users = {
    "S15tx8": {
        id: "S15tx8",
        email: "user@example.com",
        password: "password"
    },
    "9sm5xK": {
        id: "9sm5xK",
        email: "user2@example.com",
        password: "password"
    }
};

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
        return res.status(400).send('Please fill in email or password');
    } else if (user.email === email) {
        return res.status(400).send('This email already exists');
    } else {
        const userID = generateRandomString();
        const newUser = {
            id: userID,
            email: email,
            password: password
        };
        users[userID] = newUser;
        res.cookie('user_id', userID);
        res.redirect('/urls');
    };
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
        return res.status(403).send('Incorrect email or password.');
    } else if (user.password !== password) {
        return res.status(403).send('Incorrect email or password.');
    } else {
        res.cookie('user_id', user.id);
        res.redirect('/urls');
    };
});

/**
 * Logout the user.
 */
app.post('/logout', (req, res) => {
    res.clearCookie('user_id');
    res.redirect('/login');
});

/**
 * Display a listing of the resource
 */
app.get('/urls', (req, res) => {
    const id = req.cookies["user_id"];

    if(!id) {
        res.render('urls_index', {
            user: null,
            errorMessage: 'Please sign in or register to view this page.'
        });
    } else {
        res.render('urls_index', {
            user: verifyUser(id, users),
            urls: urlsForUsers(id, urlDatabase),
        });
    };
});

/**
 * Store a newly created resource in database.
 */
app.post("/urls", (req, res) => {
    const shortURL = generateRandomString();

    urlDatabase[shortURL] = {
        longURL: req.body.longURL,
        userID: req.cookies["user_id"]
    };
    res.redirect(`/urls/${shortURL}`);
});

/**
 * Show the form to create a new resource.
 */
app.get('/urls/new', (req, res) => {
    const id = req.cookies["user_id"];

    if (!id) {
        res.redirect('/login');
    } else {
        const user = users[id];
        res.render('urls_new', {user});
    };
});

/**
 * Redirect to the specified resource.
 */
app.get("/u/:shortURL", (req, res) => {
    const shortURL = req.params.shortURL;

    if (!urlDatabase[shortURL]) {
        return res.status(404).send('Page not found');
    }

    const longURL = urlDatabase[shortURL].longURL;
    res.redirect(longURL);
});

/**
 * Display the specified resource.
 */
app.get("/urls/:shortURL", (req, res) => {
    const shortURL = req.params.shortURL;
    const id = req.cookies["user_id"];

    if (!id) {
        return res.render('urls_show', {user: null, errorMessage: 'Please sign in or register to view this page.'});
    } else if (!urlDatabase[shortURL]) {
        return res.status(404).send('Not Found');
    } else if (urlDatabase[shortURL].userID !== id) {
        return res.render("urls_show", {user: null, errorMessage: 'You do not have permission to view this page.'});
     } else {
        res.render("urls_show", {
            shortURL: shortURL,
            longURL: urlDatabase[shortURL],
            user: users[id]
        });
     };
});

/**
 * Update the specified resource.
 */
app.post('/urls/:shortURL/update', (req, res) => {
    const shortURL = req.params.shortURL;
    const id = req.cookies["user_id"];

    if (!id || urlDatabase[shortURL].userID !== id) {
        res.status(403).send('You do not have permission.')
    }

    urlDatabase[shortURL].longURL = req.body.longURL;
    res.redirect('/urls');
});

/**
 * Delete the specified resource.
 */
app.post('/urls/:shortURL/delete', (req, res) => {
    const shortURL = req.params.shortURL;
    const id = req.cookies["user_id"];

    if (!id || urlDatabase[shortURL].userID !== id) {
        res.status(403).send('You do not have permission.')
    }

    delete urlDatabase[shortURL];
    res.redirect('/urls');
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
