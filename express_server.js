const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({exended: true}));

const urlDatabase = {
    S15tx: "https://tsn.ca",
    PsWtqZ: "https://google.ca"
};

// url index page
app.get('/urls', (req, res) => {
    const templateVars = urlDatabase;

    res.render('urls_index', {
        urls: templateVars
    });
});

// create a new url resource
app.get('/urls/new', (req, res) => {
    res.render('urls_new');
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
