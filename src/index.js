import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

import './index.css';
import 'semantic-ui-css/semantic.min.css'
import {App} from './App/App';
import { Provider } from "react-redux";
import store from "./store"
import history from "./history"
import { ConnectedRouter } from 'connected-react-router';

require('dotenv').config();

render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
