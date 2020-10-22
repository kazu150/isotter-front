import { FETCH_USER_DATA } from '../actions/types';

const INITIAL_STATE = {
    _id: null,
    userName: null,
    email: null,
    password: null,
    passwordConfirm: null,
    fruit: null,
    thumb: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case FETCH_USER_DATA:
            return {
                ...state,
                _id: action.payload._id,
                userName: action.payload.userName,
                email: action.payload.email,
                fruit: action.payload.fruit,
                thumb: action.payload.thumb
            }
        default:
            return state;
    }
}