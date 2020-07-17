const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

// SWAGGER stuff
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const visitsRouter = require('./routes/visits');
const usersPatientsRouter = require('./routes/usersPatients');
const rolesRouter = require('./routes/roles');
const professionsRouter = require('./routes/professions');
const patientsRouter = require('./routes/patients');
const gendersRouter = require('./routes/genders');
const addressesRouter = require('./routes/addresses');
const countriesRouter = require('./routes/countries');
const statesRouter = require('./routes/states');

const app = express();
// SWAGGER stuff
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ENABLE CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://ec2-18-185-66-15.eu-central-1.compute.amazonaws.com:5050/browser/"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/visits', visitsRouter);
app.use('/users_patients', usersPatientsRouter);
app.use('/roles', rolesRouter);
app.use('/professions', professionsRouter);
app.use('/patients', patientsRouter);
app.use('/genders', gendersRouter);
app.use('/addresses', addressesRouter);
app.use('/countries', countriesRouter);
app.use('/states', statesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
