import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  UPDATE_COMMENTS,
  CLEAR_PROFILE,
} from './types';

// Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/posts',
    });

    dispatch({
      type: GET_POSTS,
      payload: res.data.data.posts,
    });
    dispatch({ type: CLEAR_PROFILE });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getUserPosts = userID => async dispatch => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/posts/user/${userID}`,
    });

    if (res.data.status === 'success') {
      dispatch({
        type: GET_POSTS,
        payload: res.data.data.posts,
      });
      dispatch({ type: CLEAR_PROFILE });
    }
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addLike = id => async dispatch => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/posts/like/${id}`,
    });

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data.data.likes },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const removeLike = id => async dispatch => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/posts/like/${id}`,
    });

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data.data.likes },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deletePost = id => async dispatch => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/posts/${id}`,
    });

    if (res.data.status === 'success') {
      dispatch({
        type: DELETE_POST,
        payload: id,
      });
      dispatch(setAlert('Post Removed', 'success'));
    }
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addPost = formData => async dispatch => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/posts`,
      data: formData,
    });

    if (res.data.status === 'success') {
      dispatch({
        type: ADD_POST,
        payload: res.data.data.post,
      });
      dispatch(setAlert('Post Added', 'success'));
    }
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPost = id => async dispatch => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/posts/${id}`,
    });

    dispatch({
      type: GET_POST,
      payload: res.data.data.post,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addComment = (postID, formData) => async dispatch => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/posts/comment/${postID}`,
      data: formData,
    });

    if (res.data.status === 'success') {
      dispatch({
        type: UPDATE_COMMENTS,
        payload: res.data.data.comments,
      });
      dispatch(setAlert('Comment Added', 'success'));
    }
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteComment = (postID, commentID) => async dispatch => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/posts/comment/${postID}/${commentID}`,
    });

    if (res.data.status === 'success') {
      dispatch({
        type: UPDATE_COMMENTS,
        payload: res.data.data.comments,
      });
      dispatch(setAlert('Comment Removed', 'success'));
    }
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
