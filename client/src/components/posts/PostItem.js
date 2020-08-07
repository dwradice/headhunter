import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { addLike, removeLike, deletePost } from './../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, user, likes, comments, createdAt },
  showActions,
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div className='post-poster'>
        <Link to={`/profile/${user._id}`}>
          <img className='round-img post-img' src={user.avatar} alt='' />
          <h4>{user.name}</h4>
        </Link>
      </div>
      <div>
        <p className='post-date'>
          Posted at <Moment format='h:mma MM/DD/YYYY'>{createdAt}</Moment>
        </p>
        <p className='my-1'>{text}</p>
        {showActions && (
          <Fragment>
            <button
              onClick={e => addLike(_id)}
              type='button'
              className='btn btn-light'
            >
              <i className='fas fa-thumbs-up'></i>
              <span>{likes.length > 0 && <span> {likes.length}</span>}</span>
            </button>
            <button
              onClick={e => removeLike(_id)}
              type='button'
              className='btn btn-light'
            >
              <i className='fas fa-thumbs-down'></i>
            </button>
            <Link to={`/posts/${_id}`} className='btn btn-primary'>
              Discussion{' '}
              {comments.length > 0 && (
                <span className='comment-count'> {comments.length}</span>
              )}
            </Link>
            {!auth.loading && user._id === auth.user._id && (
              <button
                onClick={e => deletePost(_id)}
                type='button'
                className='btn btn-danger'
              >
                Delete <i className='fas fa-times'></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
