const express = require('express');
const router = express.Router();

const authController = require('./../controllers/authController');
const postController = require('./../controllers/postController');

// All Routes are private
router.use(authController.protect);

// ROUTE: /api/posts
//// POST: Creates Post for logged in user
//// GET: Retrieves all posts
router
  .route('/')
  .post(postController.createPost)
  .get(postController.getAllPosts);

// ROUTE: /api/posts/:id
//// GET: Retreive post by ID
//// DELETE: Delete post by ID
router
  .route('/:id')
  .get(postController.getPostByID)
  .delete(postController.deletePost);

// ROUTE: /api/posts/like/:id
//// PATCH: Add a like to post
//// DELETE: Remove a like from post
router
  .route('/like/:id')
  .patch(postController.addLike)
  .delete(postController.removeLike);

// ROUTE: /api/posts/comment/:id
//// PATCH: Add a comment to post
router.route('/comment/:id').patch(postController.addComment);

// ROUTEL /api/posts/comment/:id/:comment
router.route('/comment/:id/:comment').delete(postController.removeComment);

module.exports = router;
