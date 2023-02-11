const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const db = require('./configs/db.config');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const receiptsRouter = require('./routes/receipts');
const itemsRouter = require('./routes/items');
const remindersRouter = require('./routes/reminders');
const login = require('./routes/login');
const register = require('./routes/register');
const emailIsTaken = require('./routes/emailIsTaken');
const testThree = require('./routes/testThree');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter(db));
app.use('/receipts', receiptsRouter(db));
app.use('/items', itemsRouter(db));
app.use('/reminders', remindersRouter(db));
app.use('/login', login(db));
app.use('/register', register(db));
app.use('/emailIsTaken', emailIsTaken(db));
app.use('/testThree', testThree(db));

module.exports = app;
