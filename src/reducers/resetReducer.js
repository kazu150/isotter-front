import { VALIDATE_RESET_PAGE, RESET_PASSWORD } from '../actions/types';

const INITIAL_STATE = {
    isValidToken: null
}

export default ( state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case VALIDATE_RESET_PAGE:
            return { 
                ...state, 
                isValidToken: action.payload 
            }
        case RESET_PASSWORD:
            return {
                ...state, 
                isValidToken: false
            }
        default:
            return state;
    }
}