import { SET_ERROR, UNSET_ERROR, SET_RESULT, UNSET_RESULT } from '../actions/types';

const INITIAL_STATE = {
    errorStatus: null,
    resultStatus: null
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
        case SET_RESULT:
            return {
                ...state,
                resultStatus: action.payload
            }
        case UNSET_RESULT:
            return {
                ...state,
                resultStatus: null
            }
        default: 
            return state;
    }
}