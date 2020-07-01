import {
    EDIT_CONFIG_BEGIN,
    EDIT_CONFIG_SUCCESS,
    EDIT_CONFIG_FAILURE,
    FETCH_CONFIG_BEGIN,
    FETCH_CONFIG_SUCCESS,
    FETCH_CONFIG_FAILURE,
    TOGGLE_CONFIG_BEGIN,
    TOGGLE_CONFIG_SUCCESS,
    TOGGLE_CONFIG_FAILURE,
    CANCEL_CONFIG_EDIT
} from "../actions/configActions";

const clone = require('lodash.clone')

const initialState = {
    data: {},
    isActive: false,
    loading: false,
    updating: false,
    error: null,
}

export default function configReducer(state = initialState, action){
    switch(action.type){
        /*
            Edit config Reducers
            For when you upload a change to your config
        */
        case EDIT_CONFIG_BEGIN:
            return {
                ...state,
                updating: true,
                error: null
            }

        case EDIT_CONFIG_SUCCESS:
            return {
                ...state,
                updating: false,
                data: action.payload,
                isActive: action.payload.active,
            }
        
        case EDIT_CONFIG_FAILURE:
            return {
                ...state,
                updating: false,
                error: action.payload.error,
            }
        
        /*
            Fetch Config Reducers
            for pulling config from api
        */
        case FETCH_CONFIG_BEGIN:
            return {
                ...state,
                isActive: false,
                loading: true,
                error:null,
            }

        case FETCH_CONFIG_SUCCESS:
            
            return {
                ...state,
                loading:false,
                isActive: action.payload.active,
                data: action.payload,
            }

        case FETCH_CONFIG_FAILURE:
            return {
                ...state,
                isActive: false,
                loading: false,
                error: action.payload.error,
                data: {}
            }
        /*
            Reducers for toggling config on/off
        */ 
        case TOGGLE_CONFIG_BEGIN:
            return {
                ...state,
                updating: true,
            }
        
        case TOGGLE_CONFIG_SUCCESS:
            return {
                ...state,
                updating: false,
                isActive: action.payload.active,
                data: action.payload
            }
            
        case TOGGLE_CONFIG_FAILURE:
            return {
                ...state,
                updating: false,
                error: action.payload.error
            }

        case CANCEL_CONFIG_EDIT:
            return {
                ...state,
                data: action.payload,
            }
        default:
            return state;
    }
}