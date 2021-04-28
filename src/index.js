import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './roots/rootReducer/rootReducer';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

function init() {
    const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(rootReducer,composeEnhancers(applyMiddleware()));
    // process.env.NODE_ENV !== 'production' && ();
    window.store = store
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
}

init();