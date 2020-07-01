import {TWITTER_CONFIG_DETAIL, TWITTER_TOGGLE_CONFIG} from "../constants";
import store from "../store";

const axios = require('axios');
const _ = require('lodash');
export const FETCH_CONFIG_BEGIN = 'FETCH_CONFIG_BEGIN';
export const FETCH_CONFIG_SUCCESS = 'FETCH_CONFIG_SUCCESS';
export const FETCH_CONFIG_FAILURE = 'FETCH_CONFIG_FAILURE';

export const CANCEL_CONFIG_EDIT = "CANCEL_CONFIG_EDIT";



export const cancelConfigEdit = config => ({
    type: CANCEL_CONFIG_EDIT,
    payload: config
});

export const fetchConfigBegin = () => ({
    type: FETCH_CONFIG_BEGIN
});

export const fetchConfigSuccess = config => ({
    type: FETCH_CONFIG_SUCCESS,
    payload: config
});

export const fetchConfigFailure = error => ({
    type: FETCH_CONFIG_FAILURE,
    payload: {error}
});

export function cancelConfig(){
    return dispatch => {
        let originalConfig;
        try{
            originalConfig = localStorage.getItem("originalConfig");
            
        }catch (err){
            originalConfig = {};
        }
        dispatch(cancelConfigEdit(JSON.parse(originalConfig)))
        return originalConfig;
    }

}
export function fetchConfig(uid){
    return dispatch => {
        dispatch(fetchConfigBegin());
        const originalConfig = localStorage.getItem("originalConfig");
        if(originalConfig === null){
            return axios.get(TWITTER_CONFIG_DETAIL+uid)
            .then(
                response => {
                    dispatch(fetchConfigSuccess(response.data));
                    return response.data;
                })
            .catch(error => dispatch(fetchConfigFailure(error)))
        }else{
            let data = JSON.parse(originalConfig);
            const { configReducer } = store.getState();
            if(!_.isEqual(data, configReducer.data)){
                console.log("Difference in config detected, persisting new version");
                localStorage.setItem("originalConfig", JSON.stringify(configReducer.data));
                dispatch(fetchConfigSuccess(configReducer.data))
                return configReducer.data
            }
            dispatch(fetchConfigSuccess(data))
            return data
            
        }
    }
}
export const EDIT_CONFIG_BEGIN = 'EDIT_CONFIG_BEGIN';
export const EDIT_CONFIG_SUCCESS = 'EDIT_CONFIG_SUCCESS';
export const EDIT_CONFIG_FAILURE = 'EDIT_CONFIG_FAILURE';

export const editConfigBegin = () => ({
    type: EDIT_CONFIG_BEGIN
});

export const editConfigSuccess = config => ({
    type: EDIT_CONFIG_SUCCESS,
    payload: config
})

export const editConfigFailure = error => ({
    type: EDIT_CONFIG_FAILURE,
    payload: {error}
});

export function editConfig(uid, config){
    return dispatch => {
        dispatch(editConfigBegin());
        console.log(config.username_config.live_text.length, config.username_config.live_text)
        return axios({
            url: `${TWITTER_CONFIG_DETAIL}${uid}/`,
            method: 'put',
            data: config
        }).then(
            
            response => {
                dispatch(editConfigSuccess(response.data));
                return response.data
            }
        ).catch(error => dispatch(editConfigFailure(error)))
    }
}

export const TOGGLE_CONFIG_BEGIN = "TOGGLE_CONFIG_BEGIN"
export const TOGGLE_CONFIG_SUCCESS = "TOGGLE_CONFIG_SUCCESS"
export const TOGGLE_CONFIG_FAILURE = "TOGGLE_CONFIG_FAILURE"

export const toggleConfigBegin = () => ({
    type: TOGGLE_CONFIG_BEGIN
});

export const toggleConfigSuccess = config => ({
    type: TOGGLE_CONFIG_SUCCESS,
    payload: config
});

export const toggleConfigFailure = error => ({
    type: TOGGLE_CONFIG_FAILURE,
    payload: {error}
});

export function toggleConfig(uid){
    return dispatch => {
        dispatch(toggleConfigBegin());
        return axios.post(TWITTER_TOGGLE_CONFIG+uid).then(
            response => {
                dispatch(toggleConfigSuccess(response.data))
            }
        ).catch(error => dispatch(toggleConfigFailure(error)))
    }
}