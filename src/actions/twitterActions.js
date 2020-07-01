import {TWITTER_ACCOUNT_DETAIL, TWITTER_REFRESH_DATA} from "../constants";
const axios = require('axios');
export const FETCH_TWITTER_BEGIN   = 'FETCH_TWITTER_BEGIN';
export const FETCH_TWITTER_SUCCESS = 'FETCH_TWITTER_SUCCESS';
export const FETCH_TWITTER_FAILURE = 'FETCH_TWITTER_FAILURE';


export const fetchTwitterBegin = () => ({
  type: FETCH_TWITTER_BEGIN
});

export const fetchTwitterSuccess = twitter => ({
  type: FETCH_TWITTER_SUCCESS,
  payload: twitter
});

export const fetchTwitterFailure = error => ({
  type: FETCH_TWITTER_FAILURE,
  payload: { error }
});

export function fetchTwitter(uid){
  return dispatch => {
    dispatch(fetchTwitterBegin());
    return axios.get(TWITTER_ACCOUNT_DETAIL+uid)
      .then(
        response => {
          dispatch(fetchTwitterSuccess(response.data));
          return response.data;
        })
      .catch(error => dispatch(fetchTwitterFailure(error)))
  }
}


export const REFRESH_TWITTER_BEGIN   = 'REFRESH_TWITTER_BEGIN';
export const REFRESH_TWITTER_SUCCESS = 'REFRESH_TWITTER_SUCCESS';
export const REFRESH_TWITTER_FAILURE = 'REFRESH_TWITTER_FAILURE';

export const refreshTwitterBegin = () => ({
  type: REFRESH_TWITTER_BEGIN,
})

export const refreshTwitterSuccess = data => ({
  type: REFRESH_TWITTER_SUCCESS,
  payload: data
});

export const refreshTwitterFailure = error => ({
  type: REFRESH_TWITTER_FAILURE,
  payload: {error}
});

export function refreshTwitter(uid){
  return dispatch => {
    dispatch(refreshTwitterBegin());
    return axios.get(TWITTER_REFRESH_DATA+uid)
      .then(
        response => {
          dispatch(refreshTwitterSuccess(response.data));
          return response.data;
        })
      .catch(error => dispatch(refreshTwitterFailure(error)))

  }
}