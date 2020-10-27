import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import timelineReducer from './timelineReducer';
import errorReducer from './errorReducer';
import resetReducer from './resetReducer';
import selectedUserReducer from './selectedUserReducer';

export default combineReducers({
    auth: authReducer,
    timeline: timelineReducer,
    error: errorReducer,
    reset: resetReducer,
    selectedUser: selectedUserReducer,
    form: formReducer,
});
