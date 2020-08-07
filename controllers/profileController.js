const Profile = require('./../models/profileModel');
const User = require('./../models/userModel');
const Post = require('./../models/postModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

// Retrieve Logged In User Profile
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

// Create and Update Profile
exports.createProfile = catchAsync(async (req, res, next) => {
  const {
    company,
    location,
    occupation,
    skills,
    bio,
    github,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
  } = req.body;

  const profileFields = {};
  profileFields.user = req.user.id;
  if (company !== null) profileFields.company = company;
  if (location !== null) profileFields.location = location;
  if (occupation !== null) profileFields.occupation = occupation;
  if (bio !== null) profileFields.bio = bio;
  if (skills !== null) {
    Array.isArray(skills)
      ? skills
      : (profileFields.skills = skills.split(',').map(skill => skill.trim()));
  }
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;
  if (github) profileFields.social.github = github;

  let profile = await Profile.findOneAndUpdate(
    { user: req.user.id },
    { $set: profileFields },
    { new: true, upsert: true }
  );
  res.status(201).json({
    status: 'success',
    data: {
      profile,
    },
  });
});

// Add Experience to Profile
exports.addExperience = catchAsync(async (req, res) => {
  const { title, company, location, from, to, current, description } = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  const profile = await Profile.findOne({ user: req.user.id });

  profile.experience.unshift(newExp);

  await profile.save();

  res.status(201).json({
    status: 'success',
    data: {
      profile,
    },
  });
});

// Delete Experience
exports.deleteExperience = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    return next(new AppError('Profile not found', 404));
  }

  profile.experience = profile.experience.filter(
    exp => exp.id.toString() !== req.params.id
  );

  await profile.save();

  res.status(200).json({
    status: 'success',
    data: {
      profile,
    },
  });
});

// Add Education to Profile
exports.addEducation = catchAsync(async (req, res) => {
  const {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description,
  } = req.body;

  const newEdu = {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description,
  };

  const profile = await Profile.findOne({ user: req.user.id });

  profile.education.unshift(newEdu);

  await profile.save();

  res.status(201).json({
    status: 'success',
    data: {
      profile,
    },
  });
});

// Delete Education
exports.deleteEducation = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    return next(new AppError('Profile not found', 404));
  }

  profile.education = profile.education.filter(
    exp => exp.id.toString() !== req.params.id
  );

  await profile.save();

  res.status(200).json({
    status: 'success',
    data: {
      profile,
    },
  });
});

// Retrieves All Profiles
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

// Retrieves Single Profile
exports.getProfileByID = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({
    user: req.params.id,
  }).populate('user', ['name', 'avatar']);

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

// Deletes User, Profile, & Posts
exports.deleteAccount = catchAsync(async (req, res, next) => {
  const profile = await Profile.findById(req.params.id);

  if (!profile) {
    return next(new AppError('Profile not found', 404));
  }

  if (`${profile.user}` !== `${req.user.id}`) {
    return next(new AppError('Not authorized to delete this profile', 403));
  }

  await Post.deleteMany({ user: req.user.id });
  await Profile.findByIdAndDelete(req.params.id);
  await User.findByIdAndDelete(req.user.id);

  res.status(200).json({
    status: 'success',
  });
});
