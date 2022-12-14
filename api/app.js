const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cookieSession = require('cookie-session');
const rateLimit = require('express-rate-limit')
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:8080','https://tqueguin.github.io'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const usersRouter = require('./routes/users');
const authsRouter = require('./routes/auths');
const scoresRouter = require('./routes/scores');

const app = express();

// Limiter 
const loginRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10, // Limit each IP to 10 requests per `window`
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use('/auths/register', loginRateLimiter);

const expiryDateIn3Months = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 3);
const cookieSecreteKey = 'YouWouldnot!not!like!mypizza';
app.use(
  cookieSession({
    name: 'user',
    keys: [cookieSecreteKey],
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: expiryDateIn3Months,
      credentials : true,
    },
  }),
);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', cors(corsOptions), usersRouter);
app.use('/auths', cors(corsOptions), authsRouter);
app.use('/scores', cors(corsOptions), scoresRouter)

module.exports = app;
