import axios from "../_services/axios";
import {USER_PROFILE} from "../constants";

/*
    Fetch Password Info
    Change password
    Update Profile 
*/

export const FETCH_USER_BEGIN = "FETCH_USER_BEGIN";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export const fetchUserBegin = () => ({
    type: FETCH_USER_BEGIN
});

export const fetchUserSuccess = data => ({
    type: FETCH_USER_SUCCESS,
    payload: data
});

export const fetchUserFailure = error => ({
    type: FETCH_USER_FAILURE,
    payload: error
});

export function fetchUser(){
    return dispatch => {
        dispatch(fetchUserBegin());
        return axios.get(USER_PROFILE)
            .then(response => {
                dispatch(fetchUserSuccess(response.data))
                return response.data;
            }).catch(error => {
                dispatch(fetchUserFailure(error))
                return error.data;
            });
    }
}