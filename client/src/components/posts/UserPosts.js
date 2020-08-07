import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserPosts } from './../../actions/post';
import Spinner from './../layout/Spinner';
import PostItem from './PostItem';
import { Link } from 'react-router-dom';

const Posts = ({ getUserPosts, post: { posts, loading }, match }) => {
  useEffect(() => {
    getUserPosts(match.params.id);
  }, [getUserPosts, match.params.id]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to={`/profile/${match.params.id}`} className='btn btn-light'>
        Return To Profile
      </Link>
      {posts.length > 0 ? (
        <div className='posts'>
          {posts.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div>
          <h3 className='p-3'>This user has not made any forum posts.</h3>
        </div>
      )}
    </Fragment>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getUserPosts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
});

export default connect(mapStateToProps, { getUserPosts })(Posts);
