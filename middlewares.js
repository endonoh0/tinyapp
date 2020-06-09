const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports = [
    function (req, res, next) {
        app.use(morgan('dev'));
        next();
    },
    function (req, res, next) {
        app.use(bodyParser.urlencoded({ exended: true }));
        next();
    },
    function (req, res, next) {
        app.use(cookieParser());
    }
];
