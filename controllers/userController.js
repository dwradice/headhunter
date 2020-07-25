const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.registerUser = catchAsync(async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  res.status(200).json({
    status: 'success',
    user: newUser,
  });
});
