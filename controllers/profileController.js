const Profile = require('./../models/profileModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { findById } = require('./../models/profileModel');

exports.getMyProfile = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id }).populate(
    'user',
    ['name', 'avatar']
  );

  if (!profile) {
    return next(new AppError('Profile not found!', 400));
  }

  res.status(200).json({
    status: 'success',
    data: {
      profile,
    },
  });
});

exports.createProfile = catchAsync(async (req, res, next) => {
  const {
    company,
    location,
    status,
    skills,
    bio,
    githubUsername,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
  } = req.body;

  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (location) profileFields.location = location;
  if (status) profileFields.status = status;
  if (bio) profileFields.bio = bio;
  if (githubUsername) profileFields.githubUsername = githubUsername;
  if (skills) {
    profileFields.skills = skills.split(',').map(skill => skill.trim());
  }
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  let profile = await Profile.findOneAndUpdate(
    { user: req.user.id },
    { $set: profileFields },
    { new: true, upsert: true }
  );
  res.status(200).json({
    status: 'success',
    data: {
      profile,
    },
  });
});

exports.getAllProfiles = catchAsync(async (req, res, next) => {
  const profiles = await Profile.find().populate('user', ['name', 'avatar']);

  res.status(200).json({
    status: 'success',
    results: profiles.length,
    data: {
      profiles,
    },
  });
});

exports.getProfileByID = catchAsync(async (req, res, next) => {
  const profile = await Profile.findById(req.params.id).populate('user', [
    'name',
    'avatar',
  ]);

  if (!profile) {
    return next(new AppError('No profile found!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      profile,
    },
  });
});

exports.deleteProfile = catchAsync(async (req, res, next) => {
  const profile = await Profile.findById(req.params.id);

  if (!profile) {
    return next(new AppError('Profile not found', 404));
  }

  if (`${profile.user}` !== `${req.user.id}`) {
    return next(new AppError('Not authorized to delete this profile', 403));
  }

  await Profile.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
  });
});
