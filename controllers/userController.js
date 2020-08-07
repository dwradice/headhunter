const aws = require('aws-sdk');
const multer = require('multer');
const AppError = require('./../utils/appError');
const s3Storage = require('multer-sharp-s3');
const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');

// Get Logged In User
exports.getUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user,
    },
  });
};

const s3Config = new aws.S3({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_KEY_SECRET,
});

const multerStorage = s3Storage({
  s3: s3Config,
  Bucket: 'headhunter-assets/users',
  Key: function (req, file, cb) {
    const filename = `user-${req.user.id}-${Date.now()}.jpg`;
    req.body.avatar = `https://headhunter-assets.s3.us-east-2.amazonaws.com/users/${filename}`;
    cb(null, filename);
  },
  resize: {
    width: 500,
    height: 500,
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('File type must be an image', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPhoto = upload.single('avatar');

exports.updateUser = catchAsync(async (req, res, next) => {
  if (req.body.avatar) {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: req.body.avatar },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  }
});
