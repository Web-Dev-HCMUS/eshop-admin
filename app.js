const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {create} = require('express-handlebars');
const route = require('./routes');

const app = express();

const hbs = create({
    // Specify helpers which are only registered on this instance.
    extname: '.hbs',
    helpers: {
        getValue: (obj, idx) => obj[idx],
        length: (obj) => obj.length,
        increase: (n) => n+1,
        compare: (obj1, obj2) => ob1.compare(obj2) === 0,
    }
});
app.engine('hbs', hbs.engine);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


route(app);


module.exports = app;
