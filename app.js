const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');  // Enable CORS (For swagger)
require('dotenv').config();

// LOGIN - LOGOUT
const session = require('express-session');

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

const authRouter = require('./routes/auth');

const app = express();
// SWAGGER stuff
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// LOGIN - LOGOUT
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ENABLE CORS
app.use(cors({
  methods: 'GET,POST,PATCH,DELETE,OPTIONS',
  optionsSuccessStatus: 200,
  origin: '*'
}));
app.options('*', cors());

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

app.use('/auth', authRouter);

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
