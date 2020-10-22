import isotter from '../apis/isotter';
import { 
    SIGN_IN, 
    SIGN_OUT, 
    SET_USER,
    MOD_USER,
    SET_ERROR, 
    UNSET_ERROR,
    FETCH_NEW_TWEET,
    SHOW_ALL_TWEETS,
    FETCH_USER_DATA,
    DELETE_POST
} from './types';
import history from '../history.js';
import env from '../environment';

// Auth

export  const signIn = (userName, password) => async dispatch => {
    let response;

    try {
        response = await isotter.post('/admin/login', {
            userName: userName,
            password: password
        })

    } catch(error) {
        dispatch({ type: SET_ERROR, payload: error });
    }

    dispatch({ type: SIGN_IN, payload: response.data });
    return response;
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const setUser = (userName, userId, token) => {
    return {
        type: SET_USER,
        payload: { userName, userId, token }
    };
};

// User

export const getUserData =(userName) => async dispatch => {
    let userData;
    
    try {
        const response = await isotter.get('/admin/userStatus/' + userName)
        userData = response.data.user[0];
        // production, developで画像URLのドメイン部分を書き換え
        userData.thumb = env.API_ORIGIN + userData.thumb;

    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error });
    }

    dispatch({ type: FETCH_USER_DATA, payload: userData });
    return;
};

export const modUserData = (userData, token) => async dispatch => {
    let newUserData;
    const config = {
        headers: { 'Authorization': 'Bearer ' + token }
    };

    try {
        const response = await isotter.patch('/admin/userStatus', 
            {
                formData: userData
            },
            config
        )
        console.log(response);
        newUserData = response.data.user;
    } catch(error) {
        dispatch({ type: SET_ERROR, payload: error });
    }
    
    dispatch({ type: FETCH_USER_DATA, payload: newUserData });
    dispatch({ type: MOD_USER, payload: newUserData });
    return newUserData;
}

// Post

export const showAllTweets = () => async dispatch => {
    let tweets;
    
    try {
        const response = await isotter.get('/timeline/posts');

        // 昇順降順の調整（https://qiita.com/PianoScoreJP/items/f0ff7345229871039672）
        tweets = response.data.posts.sort(function(a,b){
            if(a._id>b._id) return -1;
            if(a._id < b._id) return 1;
            return 0;
        });

        tweets.map(tweet => {
            tweet.userId.thumb = env.API_ORIGIN + tweet.userId.thumb;
            return tweet;
        })

    } catch(error) {
        dispatch({ type: SET_ERROR, payload: error });
    }

    dispatch({ type: SHOW_ALL_TWEETS, payload: tweets });
};

export const tweet = (formValues, userId, token) => async dispatch => {
    let response;
    const config = {
        headers: { 'Authorization': 'Bearer ' + token }
    };

    try {
        response = await isotter.post(
            '/timeline/post', 
            {
                userId: userId,
                content: formValues.content,
            },
            config
        )
        history.push('/');

    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error });

    }

    dispatch({ type: FETCH_NEW_TWEET, payload: response.data });
    return;
};

export const deletePost = (postId, token) => async dispatch => { 
    let response;
    const config = {
        headers: { 'Authorization': 'Bearer ' + token }
    } 

    try {
        response = await isotter.delete( 
            '/timeline/post/' + postId, 
            config
        );
    }catch(error){
        dispatch({ type: SET_ERROR, payload: error });
    }
    dispatch({ type: DELETE_POST, payload: response.data.deletedPost })
    return;
}

// Error

export const unsetError = () => {
    return {
        type: UNSET_ERROR
    };
};