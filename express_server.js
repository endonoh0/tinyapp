const express = require('express');
const app = express();
const PORT = 8080;
const morgan = require('morgan');
const methodOverride = require('method-override');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const home = require('./routes/home');
const register = require('./routes/register');
const registerUser = require('./routes/registerUser');
const login = require('./routes/login');
const loginUser = require('./routes/loginUser');
const logout = require('./routes/logout');
const getUrls = require('./routes/getUrls');
const postUrls = require('./routes/postUrls');
const createUrls = require('./routes/createUrls');
const shareUrls = require('./routes/shareUrls');
const showUrl = require('./routes/showUrl');
const updateUrl = require('./routes/updateUrl');
const deleteUrl = require('./routes/deleteUrl');

app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(cookieSession({
    name: 'user_id',
    keys: ['iloveMrRobot11']
}));
app.use(bodyParser.urlencoded({ exended: true }));
app.set('view engine', 'ejs');

app.use(home);
app.use(register);
app.use(registerUser);
app.use(login);
app.use(loginUser);
app.use(logout);
app.use(getUrls);
app.use(postUrls);
app.use(createUrls);
app.use(shareUrls);
app.use(showUrl);
app.use(updateUrl);
app.use(deleteUrl);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
