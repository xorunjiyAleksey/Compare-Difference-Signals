import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
// import { createStore, applyMiddleware } from 'redux';
// import rootReducer from './roots/rootReducer/rootReducer';
// import { Provider } from 'react-redux';

function init() {
    // const store = createStore(rootReducer);
    // process.env.NODE_ENV !== 'production' && (window.store = store);

    ReactDOM.render(
            <App />,
        document.getElementById('root')
    );
}

init();