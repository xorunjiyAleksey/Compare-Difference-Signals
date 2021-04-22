import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
// import { store } from './redux/store';
// import { Provider } from 'react-redux';

// const init = () => {
//     process.env.NODE_ENV !== 'production' && (window.store = store);
//     ReactDOM.render(
//         <Provider>
//           <App store={store} />
//         </Provider>,
//         document.getElementById('root')
//       );
// }
// init();

const init = () => {
  // process.env.NODE_ENV !== 'production' && (window.store = store);
  ReactDOM.render(
        <App />,
      document.getElementById('root')
    );
}
init();
