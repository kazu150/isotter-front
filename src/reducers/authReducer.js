import { SIGN_IN, SIGN_OUT, SET_USER, MOD_USER } from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: null,
    userName: null,
    userId: null,
    token: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN:
        case SET_USER:
            return {
                ...state, 
                isSignedIn: true,
                userName: action.payload.userName,
                userId: action.payload.userId, 
                token: action.payload.token
            };
        case MOD_USER:
            return {
                ...state,
                userName: action.payload.userName,
                userId: action.payload._id
            }
        case SIGN_OUT:
            return {
                ...state, 
                isSignedIn: false, 
                userName: null,
                userId: null, 
                token: null
            };
        default:
            return state;
    }
};