import React from 'react';
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import Store from "./Store"

import {ActionCableProvider} from 'react-actioncable-provider';
import {WS_ROOT} from './constants';

ReactDOM.render(
    <Provider store={Store}>
    <ActionCableProvider url={WS_ROOT}>
        <Router>
            <App />
        </Router>
    </ActionCableProvider>
    </Provider>,
    document.getElementById('root'));

