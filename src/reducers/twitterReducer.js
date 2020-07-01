import {
    FETCH_TWITTER_BEGIN,
    FETCH_TWITTER_SUCCESS,
    FETCH_TWITTER_FAILURE,
    REFRESH_TWITTER_BEGIN,
    REFRESH_TWITTER_SUCCESS,
    REFRESH_TWITTER_FAILURE
} from "../actions/twitterActions";

const initialState = {
    data: {},
    loading: false,
    error: null
}

export default function twitterReducer(state = initialState, action){
    switch(action.type){
        case FETCH_TWITTER_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        
        case FETCH_TWITTER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }

        case FETCH_TWITTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                data: {}
            }
        case REFRESH_TWITTER_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        
        case REFRESH_TWITTER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }

        case REFRESH_TWITTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                data: {}
            }
        default:
            return state;
    }
}