import { combineReducers } from 'redux';
import { loaderReducer } from './loader/loaderReducer';
import { userReducer } from './userAuth/userReducer';

export const rootReducer = combineReducers({
    user: userReducer,
    loader: loaderReducer
})

