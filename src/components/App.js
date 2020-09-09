import React from 'react';
import { Router, Route } from 'react-router-dom';
import Header from './Header';
import Timeline from './Timeline';
import PostEdit from './PostEdit';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import LogIn from './LogIn';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import SignUp from './SignUp'; 
import ErrorHandler from './ErrorHandler';
import history from '../history';
import env from '../environment';

class App extends React.Component {
    state = { 
        posts: [],
        post: {},
        isAuth: false,
        currentUser: {},
        selectedUser: {},
        err: '',
        result: '',
        token: '',
        isValidToken: false
    };

    componentDidMount(){
        const expiryDate = localStorage.getItem('expiryDate');
        const token  = localStorage.getItem('token');
        const userName = localStorage.getItem('userName');
        const userId = localStorage.getItem('userId');
        console.log(process.env.NODE_ENV)

        if(new Date(expiryDate) <= new Date()){
            this.logoutHandler()
        } else if(token) {
            this.setState({
                currentUser: {
                    userName: userName,
                    _id: userId
                },
                token: token,
                isAuth: true
            })
            const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
            this.setAutoLogout(remainingMilliseconds);
        }
        this.renderPosts();

    }

    renderPosts = () => {
        fetch(env.API_ORIGIN + 'timeline/posts',{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(res.status!== 200 && res.status !== 201){
                const error = new Error('サーバー側のなにかのエラー') 
                error.status = res.status;
                throw error;
            }
            return res.json();
        })
        .then(resData => {
            resData.posts.map(post => {
                post.userId.thumb = `${env.API_ORIGIN}${post.userId.thumb}`
            })

            // 昇順降順の調整（https://qiita.com/PianoScoreJP/items/f0ff7345229871039672）
            const posts = resData.posts.sort(function(a,b){
                if(a._id>b._id) return -1;
                if(a._id < b._id) return 1;
                return 0;
            });
            this.setState({posts: posts})

        })
        .catch(err => {
            this.setState({
                err: {
                    status: err.status,
                    message: err.message
                }
            })
        })
    }

    logoutHandler = () => {
        this.setState({
            isAuth: false,
            currentUser: {},
            token: ''
        })
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('expiryDate');
    }

    onPostSubmit = post => {

        if(!post){
            this.setState({
                err: {
                    status: 422,
                    message: `入力形式が不正`
                }
            })
            return;
        }

        const method = 'POST';
        fetch(env.API_ORIGIN + 'timeline/post', {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            },
            body: JSON.stringify({
                userId: this.state.currentUser._id,
                content: post,
                
            })
        })
        .then(res => {
            if(res.status!== 200 && res.status !== 201){
                const error = new Error('サーバー側のなにかのエラー') 
                error.status = res.status;
                throw error;
            }
            return res.json()
        })
        .then(resData => {
            this.renderPosts();
            history.push('/');
        })
        .catch(err => {
            this.setState({
                err: {
                    status: err.status,
                    message: err.message
                }
            })
        })
    }

    onDeleteClick = postId => {
        const method = 'DELETE';

        fetch(env.API_ORIGIN + 'timeline/post',{
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            },
            body: JSON.stringify({
                postId: postId
            })
        })
        .then(res => {
            if(res.status!== 200 && res.status !== 201){
                const error = new Error('サーバー側のなにかのエラー') 
                error.status = res.status;
                throw error;
            }
            return res.json()
        })
        .then(resData => {
            let posts = this.state.posts;
            posts = posts.filter((obj) => {
                return obj._id !== resData.deletedPost._id;
            });
            this.setState({
                posts: posts
            });
        })
        .catch(err => {
            this.setState({
                err: {
                    status: err.status,
                    message: err.message
                }
            })
        })
    }

    onClickAuthorName = userName => {
        this.getUser(userName);
        history.push(`/profile/${userName}`);
    }
    
    onProfileButtonClick = () => {
        this.getUser(this.state.currentUser.userName)
    }

    onRenderEditPage = (user, userName) => {

        this.setState({
            selectedUser: user
        })
        history.push(`/profile/${userName}/edit`);

    }


    getUser = (userName) => {
        const method = 'GET';

        fetch(env.API_ORIGIN + 'admin/userStatus/' + userName, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(res.status!== 200 && res.status !== 201){
                const error = new Error('サーバー側のなにかのエラー') 
                error.status = res.status;
                throw error;
            }
            return res.json();
        })
        .then(resData => {
            resData.user[0].password = '';
            resData.user[0].passwordConfirm = '';
            console.log(this.state.selectedUser);
            if(!resData.user[0].fruit ){
                resData.user[0].fruit = '';
            }
            resData.user[0].thumb = env.API_ORIGIN + resData.user[0].thumb
            this.setState({
                selectedUser: resData.user[0]
            })
        })
        .catch(err => {
            this.setState({
                err: {
                    status: err.status,
                    message: err.message
                }
            })
        })
    }

    onLoginSubmit = (userName, password) => {
        const method = 'POST'

        fetch(env.API_ORIGIN + 'admin/login', {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName,
                password: password
            })
        })
        .then(res => {
            if(res.status === 404){
                const error = new Error('ユーザーがいません') 
                error.status = res.status;
                throw error;
            }else if(res.status === 422){
                const error = new Error('パスワードが一致しません') 
                error.status = res.status;
                throw error;
            }else if(res.status!== 200 && res.status !== 201){
                const error = new Error('サーバー側のなにかのエラー') 
                error.status = res.status;
                throw error;
            }
            return res.json();
        })
        .then(resData => {
            history.push('/');
            this.setState({
                currentUser: 
                    {
                        _id: resData.userId,
                        userName: resData.userName
                    },
                token: resData.token,
                isAuth: true
            })
            localStorage.setItem('token', resData.token);
            localStorage.setItem('userId', resData.userId);
            localStorage.setItem('userName', resData.userName);
            const remainingMilliseconds = 60*60*1000;
            const expiryDate = new Date(
                new Date().getTime() + remainingMilliseconds
            );
            localStorage.setItem('expiryDate', expiryDate.toISOString())
            this.setAutoLogout(remainingMilliseconds);
        })
        .catch(err => {
            this.setState({
                err: {
                    status: err.status,
                    message: err.message
                }
            })
        })
    }

    sendPasswordResetMail = email => {
        const method = 'POST';

        if(!email){
            return this.setState({
                err: {
                    status: 404,
                    message: 'emailを入力してください'
                }
            })
        }

        fetch(env.API_ORIGIN + 'admin/reset-password', {
            method: method,
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        })
        .then(res => {
            if(res.status === 404){
                const error = new Error('メールアドレスが登録されていないか、有効なメールアドレスの形式が有効ではありません') 
                error.status = res.status;
                throw error;
            }else if(res.status === 500){
                const error = new Error('サーバ側の何らかの理由でメールが送信できませんでした。時間を空けてお試しください') 
                error.status = res.status;
                throw error;
            }else if(res.status!== 200 && res.status !== 201){
                const error = new Error('サーバー側のなにかのエラー') 
                error.status = res.status;
                throw error;
            }
            return res.json()
        })
        .then(resData => {
            this.setState({
                result: `メールアドレス：${resData.email}宛にメッセージを送りました。メール内のURLから、パスワード再設定をお願いします。`
            })
        })
        .catch(err => {
            this.setState({
                err: {
                    status: err.status,
                    message: err.message
                }
            })
        })
    }

    validateResetPage = token => {
        
        fetch(env.API_ORIGIN + 'admin/reset-password/' + token)
            .then(res => {
                return res.json();
            })
            .then(resData => {
                if(resData.isValid){
                    this.setState({
                        isValidToken: true
                    })
                }else {
                    this.setState({
                        isValidToken: false
                    })
                    const error = new Error('このURLは無効です') 
                    error.status = 403;
                    throw error;
                }
            })
            .catch(err => {
                this.setState({
                    err: {
                        status: err.status,
                        message: err.message
                    }
                })
            })
    }

    resetPassword = async (password, passwordConfirm, token) => {
        try{
            const method = 'PATCH';
            if(password !== passwordConfirm){
                const error = new Error('パスワードが違います') 
                error.status = 422;
                throw error;
            }

            const res = await fetch(env.API_ORIGIN + 'admin/reset-password/' + token, {
                method: method,
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    password: password
                })
            })

            const resData = await res.json();

            if(resData.message){
                this.setState({
                    result: 'パスワード変更完了！'
                })
                history.push('/login')
            }

        } catch (err) {
            this.setState({
                err: {
                    status: err.status,
                    message: err.message
                }
            })
        }
    }
    
    setAutoLogout = milliseconds => {
        setTimeout(() => {
            this.logoutHandler();
        }, milliseconds);
    };
    

    addNewUser = async (userName, email, password, confirmPassword) => {
        try{
            const method = 'PUT';
            if(password !== confirmPassword){
                const error = new Error('パスワードが違います') 
                error.status = 422;
                throw error;
            }
            
            const res = await fetch(env.API_ORIGIN + 'admin/signup', {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: userName,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                    thumb: 'http://ipu-corp.com/wp-content/uploads/sites/17/2017/09/human-icon-big.png',
                })
            })

            // 不明箇所ID:[0001]ここで本来、サーバサイドから引き継いだエラーメッセージを表示したい
            if(res.status === 403){
                const error = new Error('すでにそのユーザーネームは使われています') 
                error.status = res.status;
                throw error;
            }else if(res.status!== 200 && res.status !== 201){
                const error = new Error('サーバー側のなにかのエラー') 
                error.status = res.status;
                throw error;
            }
            history.push('/login');
            this.setState({
                result:'ユーザ登録完了'
            })

        }catch(err){
            this.setState({
                err: {
                    status: err.status,
                    message: err.message
                }
            })
        }

    }

    updateUser = async ( oldUserData, newUserData ) => {

    // oldUserDataは、今後フロント側できちんとバリデーションを設定する際のために、一応取ってある。

        try{
            const method = 'PATCH';
            const token = localStorage.getItem('token');
            
            if(newUserData.password !== newUserData.passwordConfirm){
                const error = new Error('パスワードが違います') 
                error.status = 422;
                throw error;
            }

            console.log(newUserData.thumb[0]);
            const formData = new FormData();
            formData.append('_id', newUserData._id );
            formData.append('userName', newUserData.userName );
            formData.append('email', newUserData.email );
            formData.append('password', newUserData.password );
            formData.append('passwordConfirm', newUserData.passwordConfirm );
            formData.append('thumb', newUserData.thumb[0] );
            formData.append('fruit', newUserData.fruit );

            const res = await fetch(env.API_ORIGIN + 'admin/userStatus', {
                method: method,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                body: formData
            })

            if(res.status === 422){
                const error = new Error('すでにそのユーザーネームは使われています') 
                error.status = res.status;
                throw error;
            }else if(res.status!== 200 && res.status !== 201){
                const error = new Error('サーバー側のなにかのエラー') 
                error.status = res.status;
                throw error;
            }

            const resData = await res.json();

            this.setState({
                currentUser: {...this.state.currentUser, userName: resData.user.userName},
                selectedUser: resData.user,
                result: 'プロフィール更新完了'
            });
            localStorage.setItem('userId', resData.user._id);
            localStorage.setItem('userName', resData.user.userName);
            history.push(`/profile/${resData.user.userName}`);
    
            this.renderPosts();

        }catch(err){
            this.setState({
                err: {
                    status: err.status,
                    message: err.message
                }
            })
        }

    }

    clickErrorMessage = () => {
        this.setState({
            err: ''
        })
    }

    clickResultMessage = () => {
        this.setState({
            result: ''
        })
    }

    render(){
        return (
            <div className='ui container'>
                <Router history={history}>
                    <Header 
                        isAuth={this.state.isAuth} 
                        onLogoutClick={this.logoutHandler} 
                        onProfileButtonClick={this.onProfileButtonClick}
                        userName={this.state.currentUser.userName}
                    />
                    <div>
                        <Route path='/' 
                            exact 
                            render={ props => 
                                <Timeline 
                                    currentUserName={this.state.currentUser.userName}
                                    posts={this.state.posts} 
                                    onDeleteClick={this.onDeleteClick}
                                    onClickAuthorName={this.onClickAuthorName}
                                    {...props} 
                                /> 
                            }
                        />
                        <Route path='/post' 
                            render={ props => <PostEdit onPostSubmit={this.onPostSubmit} {...props} /> }
                        />
                        <Route path='/login'
                            render={ props => 
                                <LogIn
                                    onLoginSubmit={this.onLoginSubmit} 
                                    {...props} 
                                /> 
                            } 
                        />
                        <Route 
                            path='/forgot-password' 
                            render={ props =>
                                <ForgotPassword
                                    sendPasswordResetMail={this.sendPasswordResetMail} 
                                    {...props} 
                                />
                            }
                        />
                        <Route 
                            path='/reset-password/:token' 
                            render={ props =>
                                <ResetPassword
                                    validateResetPage={this.validateResetPage}
                                    resetPassword={this.resetPassword} 
                                    isValidToken={this.state.isValidToken}
                                    {...props} 
                                />
                            }
                        />
                        <Route path='/signup' 
                            render={ props => 
                                <SignUp 
                                    addNewUser={this.addNewUser}
                                    {...props}
                                />
                            }
                        />
                        <Route path='/profile/:userName' 
                            exact
                            render={ props => 
                                <Profile 
                                    onRenderEditPage = {this.onRenderEditPage}
                                    selectedUser={this.state.selectedUser}
                                    getUser = {this.getUser}
                                    {...props}
                                />
                            } 
                        />
                        <Route path='/profile/:userName/edit'
                            render={ props => 
                                <ProfileEdit
                                    selectedUser={this.state.selectedUser}
                                    getUser = {this.getUser}
                                    updateUser={this.updateUser}
                                    {...props}
                                />
                            } 
                        />
                        {/* 
                            ↑ 「React Router v4 でルーティング先の component に Props を渡す方法」参照
                            https://ngzm.hateblo.jp/entry/2017/06/23/001352 
                        */}
                    </div>
                    <ErrorHandler 
                        error={this.state.err} 
                        result={this.state.result} 
                        clickErrorMessage={this.clickErrorMessage} 
                        clickResultMessage={this.clickResultMessage} 
                    />
                </Router>
            </div>
        );
    }
};

export default App;