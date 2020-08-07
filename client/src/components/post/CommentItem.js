import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from './../../actions/post';
import Moment from 'react-moment';

const CommentItem = ({
  postID,
  comment: { createdAt, _id, user, text, name, avatar },
  auth,
  deleteComment,
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div className='post-poster'>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={e => deleteComment(postID, _id)}
            type='button'
            className='btn btn-danger'
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
      <div>
        <p className='post-date'>
          Posted at <Moment format='h:mma MM/DD/YYYY'>{createdAt}</Moment>{' '}
        </p>
        <p className='my-1'>{text}</p>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
