const express = require('express');
const router = express.Router();

const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

// ROUTE: /api/users
//// GET: Gets Logged In User Info
//// POST: Registers new user and sends JWT
//// PATCH: Upload User Photo
router
  .route('/')
  .get(authController.protect, userController.getUser)
  .post(authController.registerUser)
  .patch(
    authController.protect,
    userController.uploadPhoto,
    userController.updateUser
  );

// ROUTE: /api/users/login
//// POST: Logs in user and sends JWT
router.post('/login', authController.login);

module.exports = router;
