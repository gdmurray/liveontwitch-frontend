import {
    FETCH_CONNECTED_BEGIN,
    FETCH_CONNECTED_SUCCESS,
    FETCH_CONNECTED_FAILURE
} from "../actions/settingsActions";

const initialState ={
    loading: false,
    data: {},
    error: false,
}
export default function settingReducer(state=initialState, action){
    switch(action.type){
        case FETCH_CONNECTED_BEGIN:
            return {
                ...state,
                loading: true
            }
        case FETCH_CONNECTED_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        
        case FETCH_CONNECTED_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}