import { SET_ERROR, UNSET_ERROR, SET_RESULT, UNSET_RESULT } from '../actions/types';

const INITIAL_STATE = {
    errorCode: null,
    errorStatus: null,
    resultStatus: null
}

export default (state= INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_ERROR:
            return {
                ...state,
                errorCode: action.payload.status,
                // サーバーサイドから流れるエラー本文はdata.errorMessageから、
                // クライアントサイドからの場合はerrorMessageから拾う
                errorStatus: action.payload.data?.errorMessage || action.payload.errorMessage
            }
        case UNSET_ERROR:
            return {
                ...state,
                errorCode: null,
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