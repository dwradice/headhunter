const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');
const profileRouter = require('./routes/profileRoutes');
const postRouter = require('./routes/postRoutes');

// Init Express
const app = express();

// Set Security HTTP Headers
app.use(helmet());

// Body parser, reading data from body
app.use(
  express.json({
    limit: '10kb',
  })
);

// Cookie parser
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data Sanitization against XSS
app.use(xss());

// Compression
app.use(compression());

// ROUTING
app.use('/api/users', userRouter);
app.use('/api/profiles', profileRouter);
app.use('/api/posts', postRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Error Handling
app.use(globalErrorHandler);

module.exports = app;
