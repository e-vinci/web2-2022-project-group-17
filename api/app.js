const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cookieSession = require('cookie-session');

const usersRouter = require('./routes/users');
const pizzaRouter = require('./routes/pizzas');
const authsRouter = require('./routes/auths');
const scoresRouter = require('./routes/scores');

const app = express();

const expiryDateIn3Months = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 3);
const cookieSecreteKey = 'YouWouldnot!not!like!mypizza';
app.use(
  cookieSession({
    name: 'user',
    keys: [cookieSecreteKey],
    cookie: {
      httpOnly: true,
      expires: expiryDateIn3Months,
    },
  }),
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/pizzas', pizzaRouter);
app.use('/auths', authsRouter);
app.use('/scores', scoresRouter)

module.exports = app;
