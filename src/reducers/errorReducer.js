import { SET_ERROR, UNSET_ERROR } from '../actions/types';

const INITIAL_STATE = {
    errorStatus: null
}

export default (state= INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_ERROR:
            return {
                ...state,
                errorStatus: action.payload
            }
        case UNSET_ERROR:
            return {
                ...state,
                errorStatus: null
            }
        default: 
            return state;
    }
}