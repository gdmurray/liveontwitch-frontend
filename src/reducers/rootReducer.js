import {combineReducers } from "redux";
import twitterReducer from "./twitterReducer";
import configReducer from "./configReducer";
import registerReducer from "./registerReducer";
import profileReducer from "./profileReducer";
import settingsReducer from "./settingReducer";
import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from "redux-form";

export default (history) => combineReducers({
    router: connectRouter(history),
    form: formReducer,
    twitterReducer,
    configReducer,
    registerReducer,
    profileReducer,
    settingsReducer
});