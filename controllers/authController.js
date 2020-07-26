const jwt = require('jsonwebtoken');

const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');

// Authenticates User and Authorizes protected routes
exports.protect = catchAsync(async (req, res, next) => {
  // Get token
  let token = null;
  if (req.header('x-auth-token')) {
    token = req.header('x-auth-token');
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (token === null) {
    return next(
      new AppError('You need to be logged in to access this route', 401)
    );
  }
  // Verify Token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError('User no longer exists', 401));
  }

  req.user = freshUser;
  next();
});

// Register User And Send JWT
exports.registerUser = catchAsync(async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const id = newUser.id;

  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: newUser,
      token,
    },
  });
});

// Login User and Send JWT
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check to see if body includes email and password
  if (!email || !password) {
    return next(new AppError('Provide email and password to login', 400));
  }

  // Check if user exists & Verify Password
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // Sign and send token
  const id = user.id;

  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user,
      token,
    },
  });
});
