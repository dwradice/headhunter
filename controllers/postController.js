const Post = require('./../models/postModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createPost = catchAsync(async (req, res) => {
  const post = await Post.create({
    user: req.user.id,
    text: req.body.text,
  });

  res.status(201).json({
    status: 'success',
    data: {
      post,
    },
  });
});

exports.getAllPosts = catchAsync(async (req, res) => {
  const posts = await Post.find()
    .populate('user', ['name', 'avatar'])
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      posts,
    },
  });
});

exports.getPostByID = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate('user', [
    'name',
    'avatar',
  ]);

  if (!post) {
    return next(new AppError('Post not found.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError('Post not found.', 404));
  }

  if (post.user.toString() !== req.user.id) {
    return next(new AppError('Not Authorized to delete this post', 403));
  }

  await Post.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
  });
});

exports.addLike = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  // Check to see if user already liked post
  if (
    post.likes.filter(like => like.user.toString() === req.user.id).length > 0
  ) {
    return next(new AppError('Can only like a post once.', 400));
  }

  post.likes.unshift({ user: req.user.id });

  await post.save();

  res.status(200).json({
    status: 'success',
    data: {
      likes: post.likes,
    },
  });
});

exports.removeLike = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  // Check to see if user liked post
  if (
    post.likes.filter(like => like.user.toString() === req.user.id).length === 0
  ) {
    return next(new AppError('Post has not been liked', 400));
  }

  // Remove Like
  post.likes = post.likes.filter(({ user }) => user.toString() !== req.user.id);

  await post.save();

  res.status(200).json({
    status: 'success',
    data: {
      likes: post.likes,
    },
  });
});

exports.addComment = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError('Post not found.', 404));
  }

  post.comments.push({ user: req.user.id, text: req.body.text });

  await post.save();

  res.status(201).json({
    status: 'success',
    data: {
      comments: post.comments,
    },
  });
});

exports.removeComment = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError('Post not found.', 404));
  }

  const comment = post.comments.find(
    comment => comment.id === req.params.comment
  );

  if (!comment) {
    return next(new AppError('Comment not found.', 404));
  }

  if (comment.user.toString() !== req.user.id) {
    return next(new AppError('Not Authorized to Delete Comment', 403));
  }

  post.comments = post.comments.filter(
    ({ id }) => id.toString() !== req.params.comment
  );

  await post.save();

  res.status(201).json({
    status: 'success',
    data: {
      comments: post.comments,
    },
  });
});
