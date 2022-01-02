const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {create} = require('express-handlebars');
const route = require('./routes');
const session = require('express-session');
const passport = require('./passport');

const app = express();

const hbs = create({
    // Specify helpers which are only registered on this instance.
    extname: '.hbs',
    helpers: {
        getValue: (obj, idx) => obj[idx],
        length: (obj) => obj.length,
        increaseIndex: (arrIdx) => arrIdx + 1,
        getPage: (total, limit) => total % limit + 1,
        for: function(from, to, incr, block) {
            let accum = '';
            for(let i = from; i <= to; i += incr)
                accum += block.fn(i);
            return accum;
        },
        numberWithCommas: (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
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

app.use(session({
    secret: "cats",
    resave:true,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
    res.locals.user = req.user;
    next();
})

route(app);

module.exports = app;
