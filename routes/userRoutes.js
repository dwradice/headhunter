const express = require('express');
const router = express.Router();

const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

// ROUTE: /api/users
//// GET: Gets Logged In User Info
//// POST: Registers new user and sends JWT
router
  .route('/')
  .get(authController.protect, userController.getUser)
  .post(authController.registerUser);

// ROUTE: /api/users/login
//// POST: Logs in user and sends JWT
router.post('/login', authController.login);

module.exports = router;
