const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
  },
  email: {
    type: String,
    required: [true, 'User must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    minlength: [8, 'Password must be at least 8 characters'],
    required: [true, 'Enter a password'],
    select: false,
  },
  avatar: {
    type: String,
    default:
      'https://headhunter-assets.s3.us-east-2.amazonaws.com/users/default-user.jpg',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt and Store password on save
userSchema.pre('save', async function (next) {
  // Only will run if password has been modified
  if (!this.isModified('password')) return next();

  // Hash Password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
