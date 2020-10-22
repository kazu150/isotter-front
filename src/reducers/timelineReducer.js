import { FETCH_NEW_TWEET, SHOW_ALL_TWEETS, DELETE_POST } from '../actions/types';

const INITIAL_STATE = {
    allTweets: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_NEW_TWEET:
        case SHOW_ALL_TWEETS:
            return {
                ...state,
                allTweets: action.payload
            }
        case DELETE_POST:
            return {
                ...state,
                allTweets: state.allTweets.filter((obj) => {
                    return obj._id !== action.payload._id;
                })
            }
        default:
            return state;
    }
}