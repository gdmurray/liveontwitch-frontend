import axios from "../_services/axios";
import {CONNECTED_ACCOUNTS} from "../constants";

export const FETCH_CONNECTED_BEGIN = "FETCH_CONNECTED_BEGIN";
export const FETCH_CONNECTED_SUCCESS = "FETCH_CONNECTED_SUCCESS";
export const FETCH_CONNECTED_FAILURE = "FETCH_CONNECTED_FAILURE";

export const fetchConnectedBegin = () => ({
    type: FETCH_CONNECTED_BEGIN
})

export const fetchConnectedSuccess = data => ({
    type: FETCH_CONNECTED_SUCCESS,
    payload: data
})

export const fetchConnectedFailure = error => ({
    type: FETCH_CONNECTED_FAILURE,
    payload: {error}
})

export function fetchConnected(){
    return dispatch => {
        dispatch(fetchConnectedBegin());
        return axios.get(CONNECTED_ACCOUNTS)
            .then(response => {
                dispatch(fetchConnectedSuccess(response.data));
                return response.data
            }).catch(error => {
                dispatch(fetchConnectedFailure(error.data));
                return error.data
            })
    }
}