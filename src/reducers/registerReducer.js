import {
    VALIDATE_REGISTER_FIELDS_BEGIN,
    VALIDATE_REGISTER_FIELDS_SUCCESS,
    VALIDATE_REGISTER_FIELDS_FAILURE,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE
} from "../actions/registerActions";

const initialState = {
    error: false,
    loading: false,
    registered: false,
    valid: undefined
}
export default function registerReducer(state = initialState, action){
    switch(action.type){
        case VALIDATE_REGISTER_FIELDS_BEGIN:
            return {
                ...state,
            }
        
        case VALIDATE_REGISTER_FIELDS_SUCCESS:
            return {
                ...state,
                valid: action.payload.valid
            }
        
        case VALIDATE_REGISTER_FIELDS_FAILURE:
            return {
                ...state,
                valid: false,
                error: action.payload.error
            }
        
        case REGISTER_USER_BEGIN:
            return {
                ...state,
                loading: true
            }
        
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                registered: true
            }
        case REGISTER_USER_FAILURE:
            return {
                ...state,
                loading: false,
                registered: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}