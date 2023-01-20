import {
    createStore,
    applyMiddleware
} from 'redux';

import {
    rootReducer
} from './rootReducer';

import thunk from 'redux-thunk';
import {
    composeWithDevTools
} from '@redux-devtools/extension';

const reduxMiddleware = [thunk]

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...reduxMiddleware)))

export default store;