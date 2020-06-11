const express = require('express');
const app = express();
const PORT = 8080;

const { generateRandomString, verifyUser, urlsForUsers} = require('./helpers');
const morgan = require('morgan');
const methodOverride = require('method-override');
var cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(cookieSession({
    name: 'user_id',
    keys: ['iloveMrRobot11']
}));
app.use(bodyParser.urlencoded({ exended: true }));
app.set('view engine', 'ejs');

/*** URL Database ****/
const urlDatabase = {
    b6UTxQ: { longURL: "https://www.tsn.ca", userID: "aJ48lW" },
    i3BoGr: { longURL: "https://www.google.ca", userID: "aJ48lW" }
};

/*** Users Databse ***/
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
};

/**
 * Display the home page.
 */
app.get('/', (req, res) => {
    if (!req.session.user_id) {
        res.render('pages/login', {user: null});
    };
    res.redirect('/urls');
});

/**
 * Display the form to register.
 */
app.get('/register', (req, res) => {
    if (!req.session.user_id) {
        res.render('pages/register', {user: null});
    };
    res.redirect('/urls')
});

/**
 * Register a new user.
 */
app.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = verifyUser(email, users);

    if (email === '' || password === '') {
        return res.status(400).send('Please fill in email or password');
    } else if (user.email === email) {
        return res.status(400).send('This email already exists');
    } else {
        const userID = generateRandomString();
        const hashedPassword = bcrypt.hashSync(password,10);
        const newUser = {
            id: userID,
            email: email,
            password: hashedPassword
        };
        users[userID] = newUser;
        req.session.user_id = userID;
        res.redirect('/urls');
    };
});

/*

*/

/**
 * Display the form to login.
 */
app.get('/login', (req, res) => {
    if (!req.session.user_id) {
        res.render('pages/login', {user: null});
    };

    res.redirect('/urls');
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
    } else if (!bcrypt.compareSync(password, user.password)) {
        return res.status(403).send('Incorrect email or password.');
    } else {
        req.session.user_id = user.id;
        res.redirect('/urls');
    };
});

/**
 * Logout the user.
 */
app.post('/logout', (req, res) => {
    req.session = null;
    res.redirect('/urls');
});

/**
 * Display a listing of the resource
 */
app.get('/urls', (req, res) => {
    const id = req.session.user_id;

    if(!id) {
        res.render('urls_index', {
            user: null,
            errorMessage: 'Please sign in or register to view this page.'
        });
    }
    res.render('urls_index', {
        user: verifyUser(id, users),
        urls: urlsForUsers(id, urlDatabase),
        errorMessage: null
    });
});

/**
 * Store a newly created resource in database.
 */
app.post("/urls", (req, res) => {
    const shortURL = generateRandomString();

    urlDatabase[shortURL] = {
        longURL: req.body.longURL,
        userID: req.session.user_id
    };
    res.redirect(`/urls/${shortURL}`);
});

/**
 * Show the form to create a new resource.
 */
app.get('/urls/new', (req, res) => {
    const id = req.session.user_id;

    if (!id) {
        res.redirect('/login');
    };
    const user = users[id];
    res.render('urls_new', {user});
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
    const id = req.session.user_id;

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
app.put('/urls/:shortURL/update', (req, res) => {
    const shortURL = req.params.shortURL;
    const id = req.session.user_id;

    if (!id || urlDatabase[shortURL].userID !== id) {
        res.status(403).send('You do not have permission.')
    };

    urlDatabase[shortURL].longURL = req.body.longURL;
    res.redirect('/urls');
});

/**
 * Delete the specified resource.
 */
app.delete('/urls/:shortURL/delete', (req, res) => {
    const shortURL = req.params.shortURL;
    const id = req.session.user_id;

    if (!id || urlDatabase[shortURL].userID !== id) {
        res.status(403).send('You do not have permission.')
    };

    delete urlDatabase[shortURL];
    res.redirect('/urls');
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
