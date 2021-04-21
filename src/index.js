import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./app/App.js";
import 'antd/dist/antd.css';
import reportWebVitals from './reportWebVitals';
import 'remixicon/fonts/remixicon.css'
import {Provider} from "react-redux";
import store, {persistor, history} from "./redux/store";
import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/integration/react'


ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <ConnectedRouter history={history}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </ConnectedRouter>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();