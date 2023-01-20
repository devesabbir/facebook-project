import {
    USER_LOGIN,
    USER_LOG_OUT,
    USER_REGISTER
} from './actionTypes';

const initialState = {
    user: {},
    message: ''
};

export const userReducer = (state = initialState, {
    type,
    payload
}) => {
    switch (type) {
        case USER_REGISTER:
            return {
                    user: {},
                    message: 'User Registration Successfull.'
            }

        case USER_LOGIN: 
            return {
                user: payload,
                message: 'User Login Successfull.'
            }  
            
        case USER_LOG_OUT:   
             return {
                user: {},
                message: 'User Log out Successfull.' 
             }
            default:
                return state;
    }
}