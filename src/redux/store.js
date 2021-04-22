import { createStore } from 'redux';
import rootReducer from '../roots/rootReducer/rootReducer';

const store = createStore(rootReducer);

export default store;