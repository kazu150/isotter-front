import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import timelineReducer from './timelineReducer';
import errorReducer from './errorReducer'
import selectedUserReducer from './selectedUserReducer'

export default combineReducers({
    auth: authReducer,
    timeline: timelineReducer,
    error: errorReducer,
    selectedUser: selectedUserReducer,
    form: formReducer,
});
