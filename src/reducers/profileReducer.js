import {
    FETCH_USER_BEGIN,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE
} from "../actions/profileActions";


const initialState = {
    hasPassword: undefined,
    error: false,
    data: {},
    loading: true
}

export default function profileReducer(state=initialState, action){
    switch(action.type){
        case FETCH_USER_BEGIN:
            return {
                ...state,
                loading: true
            }
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                hasPassword: action.payload.has_password
            }

        case FETCH_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        
        default:
            return state
    }
}