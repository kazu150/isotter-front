import isotter from '../apis/isotter';
import { 
    SIGN_IN, 
    SIGN_OUT, 
    SIGN_UP,
    SET_USER,
    MOD_USER,
    SET_ERROR, 
    UNSET_ERROR,
    SET_RESULT,
    UNSET_RESULT,
    FETCH_NEW_TWEET,
    SHOW_ALL_TWEETS,
    FETCH_USER_DATA,
    DELETE_POST,
    VALIDATE_RESET_PAGE,
    RESET_PASSWORD
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
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('expiryDate');

    return { type: SIGN_OUT };
};

export const signUp = ( formValues ) => async dispatch => {
    console.log(formValues)

    try {
        const response = await isotter.put('/admin/signup/', {
            userName: formValues.userName,
            email: formValues.email,
            password: formValues.password,
            confirmPassword: formValues.passwordConfirm
        })

        if(response.status !== 201){
            throw new Error('登録できませんでした')
        }

        dispatch({ type: SIGN_UP });
        history.push('/login');
        
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error });
    }


}

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

    // file(今回はプロフ画像)を含む場合があるため、JSONではなくフォーム形式で送る
    const formData = new FormData();
    formData.append('_id', userData._id)    
    if(userData.email){
        formData.append('email', userData.email)
    }    
    if(userData.fruit){
    formData.append('fruit', userData.fruit)
    }
    if(userData.password){
        formData.append('password', userData.password)
        formData.append('passwordConfirm', userData.passwordConfirm)
    }
    if(userData.thumb){
        formData.append('thumb', userData.thumb)
    }
    if(userData.userName){
        formData.append('userName', userData.userName)
    }
    for(let item of formData){
        console.log(item);
    }

    try {
        const response = await fetch(
            `${env.API_ORIGIN}admin/userStatus`,
            {
                method: 'PATCH',
                headers: { 'Authorization': 'Bearer ' + token },
                body: formData
            }
        )

        // fetchメソッドはjsonで返ってくる
        // https://shimablogs.com/fetch-api-axios-difference
        const data = await response.json()
        
        // responseが200番台でない場合、response.okがfalseとなる
        if(!response.ok) throw new Error()
        newUserData = data.user;
    } catch(error) {
        dispatch({ type: SET_ERROR, payload: error });
    }

    // selectedUserReducerの内容を最新状態に更新
    dispatch({ type: FETCH_USER_DATA, payload: newUserData });

    // authReducerの内容を最新状態に更新
    dispatch({ type: MOD_USER, payload: newUserData });

    // 最新のuserDataを返す
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

    dispatch({ type: FETCH_NEW_TWEET, payload: response.data.post });
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
        
        if(response.status !== 201){
            throw new Error('何かしらのエラー')
        }

        dispatch({ type: DELETE_POST, payload: response.data.deletedPost })
        return;

    }catch(error){
        dispatch({ type: SET_ERROR, payload: error });
    }
}

// PasswordReset

export const sendPasswordResetRequest = (email) => async dispatch => {

    try {
        const response = await isotter.post(
            '/admin/reset-password',
            { email: email }
        ) 

        if(response.status !== 200){
            throw new Error('何かしらのエラー')
        }

        dispatch({ 
            type: SET_RESULT, 
            payload: `メールアドレス：${email}宛にメッセージを送りました。メール内のURLから、パスワード再設定をお願います`
        });

    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error });
    }
}

export const validateResetPage = (token) => async dispatch => {
    const response = await isotter.get(
        '/admin/reset-password/' + token
    );

    dispatch({ type: VALIDATE_RESET_PAGE, payload: response.data.isValid });
};

export const resetPassword = (password, passwordConfirm, token) => async dispatch => {

    try {
        if(password !== passwordConfirm){
            const error = new Error('パスワードが違います') 
            error.status = 422;
            throw error;
        };

        const response = await isotter.patch(
            'admin/reset-password/' + token,
            { password: password }
        );
    
        if(response.status !== 201){
            throw new Error('何かしらのエラー');
        }
    
        dispatch({ type: RESET_PASSWORD });
        history.push('/login');

    } catch(error){
        dispatch({ type: SET_ERROR, payload: error });
    }
};

// Error

export const unsetError = () => {
    return { type: UNSET_ERROR };
};

export const unsetResult = () => {
    return { type: UNSET_RESULT };
};