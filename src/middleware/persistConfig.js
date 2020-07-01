import {FETCH_CONFIG_SUCCESS} from "../actions/configActions";
const persistConfig = store => next => action => {
    if(action !== undefined){
        if(action.type === FETCH_CONFIG_SUCCESS){
            localStorage.setItem('originalConfig', JSON.stringify(action.payload));
        }
        return next(action);
    }
}

export default persistConfig; 