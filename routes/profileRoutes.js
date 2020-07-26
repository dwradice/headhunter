const express = require('express');
const router = express.Router();

const authController = require('./../controllers/authController');
const profileController = require('./../controllers/profileController');

// ROUTE: /api/profiles
//// POST: Create a profile
//// GET: Retreive all profiles
router
  .route('/')
  .post(authController.protect, profileController.createProfile)
  .get(profileController.getAllProfiles);

// ROUTE: /api/profiles/experience
//// PATCH: Add an experience to profile
router
  .route('/experience')
  .patch(authController.protect, profileController.addExperience);

// ROUTE: /api/profiles/experience/:id
//// DELETE: Delete experience from profile
router
  .route('/experience/:id')
  .delete(authController.protect, profileController.deleteExperience);

// ROUTE: /api/profiles/education
//// PATCH: Add an education to profile
router
  .route('/education')
  .patch(authController.protect, profileController.addEducation);

// ROUTE: /api/profiles/education/:id
//// DELETE: Delete education from profile
router
  .route('/education/:id')
  .delete(authController.protect, profileController.deleteEducation);

// ROUTE: /api/profiles/:id
//// GET: Get profile by ID
//// DELETE: Delete entire account
router
  .route('/:id')
  .get(profileController.getProfileByID)
  .delete(authController.protect, profileController.deleteAccount);

// ROUTE: /api/profiles/me
//// GET: Retrieve logged in user profile
router.get('/me', authController.protect, profileController.getMyProfile);

module.exports = router;
