import { urlApi } from '../constant';
import { deleteProfileData } from './politicianProfile';

// -------- User Signup-Login -------- //
export const startFetchSignupLogin = () => ({
  type: 'START_FETCH_SIGNUP_LOGIN'
});

export const successFetchSignupLogin = (user, token) => ({
  type: 'SUCCESS_FETCH_SIGNUP_LOGIN',
  user,
  token
});

export const errorFetchSignupLogin = err => ({
  type: 'ERROR_FETCH_SIGNUP_LOGIN',
  err
});

export const fetchSignup = user => dispatch => {
  dispatch(startFetchSignupLogin());
  if (user.confirmPassword) delete user.confirmPassword;

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };

  fetch(`${urlApi}/auth/signup`, options)
    .then(res => res.json())
    .then(payload => {
      const { success, msg, user, token } = payload;

      if (!success) {
        dispatch(errorFetchSignupLogin(msg));
      } else {
        dispatch(successFetchSignupLogin(user, token));
      }
    })
    .catch(err => {
      dispatch(errorFetchSignupLogin('Signup error'))
      console.log(err);
    });
};

export const fetchLogin = user => dispatch => {
  dispatch(startFetchSignupLogin());

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };

  fetch(`${urlApi}/auth/login`, options)
    .then(res => res.json())
    .then(payload => {
      const { success, msg, user, token } = payload;

      if (!success) {
        dispatch(errorFetchSignupLogin(msg));
      } else {
        dispatch(successFetchSignupLogin(user, token));
      }
    })
    .catch(err => {
      dispatch(errorFetchSignupLogin('Login error'))
      console.log(err);
    });
};

// -------- Other User Actions -------- //
export const deleteUserData = () => ({
  type: 'DELETE_USER_DATA'
});

export const userLogout = () => dispatch => {
  dispatch(deleteUserData());
  dispatch(deleteProfileData());
}

export const loginRequired = () => ({
  type: 'LOGIN_REQUIRED'
});

export const requestLogin = () => ({
  type: 'REQUEST_LOGIN'
});

export const likePolitician = politicianId => ({
  type: 'LIKE_POLITICIAN',
  politicianId
});

export const dislikePolitician = politicianId => ({
  type: 'DISLIKE_POLITICIAN',
  politicianId
});

export const followPolitician = politicianId => ({
  type: 'FOLLOW_POLITICIAN',
  politicianId
});

export const unfollowPolitician = politicianId => ({
  type: 'UNFOLLOW_POLITICIAN',
  politicianId
});

// -------- Get User with token -------- //
