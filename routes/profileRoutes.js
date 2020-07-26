const express = require('express');

const authController = require('./../controllers/authController');
const profileController = require('./../controllers/profileController');

const router = express.Router();

router
  .route('/')
  .post(authController.protect, profileController.createProfile)
  .get(profileController.getAllProfiles);

router
  .route('/:id')
  .get(profileController.getProfileByID)
  .delete(authController.protect, profileController.deleteProfile);

router.get('/me', authController.protect, profileController.getMyProfile);

module.exports = router;
