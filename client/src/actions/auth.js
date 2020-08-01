import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from './../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types';

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios({
      method: 'GET',
      url: '/api/users',
    });

    dispatch({
      type: USER_LOADED,
      payload: res.data.data.user,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async dispatch => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/users',
      data: {
        name,
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.data,
      });

      dispatch(loadUser());
    }
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.data,
      });

      dispatch(loadUser());
    }
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT})
}
