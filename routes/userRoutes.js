const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, userController.getUser)
  .post(authController.registerUser);

router.post('/login', authController.login);

module.exports = router;
