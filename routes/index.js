const createError = require("http-errors");
const homeRouter = require('../components/home');
const productsRouter = require('../components/products');
const authRouter = require('../components/auth')
const loggedInUserGuard = require('../middlewares/loggedInIserGuard')
const registerRouter = require('../components/register')
const profileRouter = require('../components/profile')
const customerRouter = require('../components/customer');

function route(app){
  app.use('/auth', authRouter);
  app.use('/account', loggedInUserGuard, profileRouter);
  app.use('/register', loggedInUserGuard, registerRouter);
  app.use('/customer', loggedInUserGuard, customerRouter);
  app.use('/products', loggedInUserGuard, productsRouter);
  app.use('/', loggedInUserGuard, homeRouter);

// catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

// error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {layout: false});
  });
}


module.exports = route;
