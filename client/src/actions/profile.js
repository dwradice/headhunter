import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
  FILTER_PROFILES,
  CLEAR_FILTER,
  CLEAR_POST,
} from './types';

// Get Logged in User Profile
export const getLoggedInProfile = () => async dispatch => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/profiles/me/profile',
    });

    dispatch({
      type: GET_PROFILE,
      payload: res.data.data.profile,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all profiles
export const getAllProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/profiles',
    });

    dispatch({
      type: GET_PROFILES,
      payload: res.data.data.profiles,
    });
    dispatch({ type: CLEAR_POST });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const filterProfiles = text => async dispatch => {
  dispatch({ type: FILTER_PROFILES, payload: text });
};

export const clearFilter = () => async dispatch => {
  dispatch({ type: CLEAR_FILTER });
};

// Get profile by id
export const getProfileByID = userID => async dispatch => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/profiles/${userID}`,
    });

    dispatch({
      type: GET_PROFILE,
      payload: res.data.data.profile,
    });
    dispatch({ type: CLEAR_POST });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/profiles',
      data: formData,
    });

    dispatch({
      type: GET_PROFILE,
      payload: res.data.data.profile,
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/profiles/experience',
      data: formData,
    });

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.data.profile,
    });

    dispatch(setAlert('Experience added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    dispatch(setAlert('fuck you', 'danger'));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async dispatch => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/profiles/education',
      data: formData,
    });

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.data.profile,
    });

    dispatch(setAlert('Education added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/profiles/experience/${id}`,
    });

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.data.profile,
    });

    dispatch(setAlert('Experience removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/profiles/education/${id}`,
    });

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.data.profile,
    });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete account and profile
export const deleteAccount = id => async dispatch => {
  if (
    window.confirm(
      'Are you sure you want to delete account? Action can not be undone'
    )
  ) {
    try {
      const res = await axios({
        method: 'DELETE',
        url: `/api/profiles/${id}`,
      });

      if (res.data.status === 'success') {
        dispatch({ type: CLEAR_PROFILE });

        dispatch({ type: DELETE_ACCOUNT });

        dispatch(setAlert('Your account has been permanently deleted'));
      }
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
