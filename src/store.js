import {createStore, applyMiddleware, compose} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';

import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers/rootReducer';

import history from './history';
import persistConfig from "./middleware/persistConfig";

const initialState = {}
const enhancers = []
const middleware = [thunk, persistConfig, routerMiddleware(history)]

if (process.env.NODE_ENV === 'development'){
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

    if (typeof devToolsExtension === 'function'){
        enhancers.push(devToolsExtension());
    }
}


const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
)

export default createStore(
    rootReducer(history),
    initialState,
    composedEnhancers
)
