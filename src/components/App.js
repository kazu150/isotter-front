import React from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { setUser, showAllTweets } from '../actions'
import Header from './Header.js';
import Timeline from './Timeline.js';
import PostEdit from './PostEdit.js';
import Profile from './Profile.js';
import ProfileEdit from './ProfileEdit.js';
import LogIn from './LogIn.js';
import ForgotPassword from './ForgotPassword.js';
import ResetPassword from './ResetPassword.js';
import SignUp from './SignUp.js'; 
import ErrorHandler from './ErrorHandler.js';
import history from '../history.js';
import env from '../environment';

class App extends React.Component {
    state = { 
        posts: [],
        post: {},
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
            this.props.setUser(userName, userId, token);
            const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
            this.setAutoLogout(remainingMilliseconds);
        }
        this.props.showAllTweets();

    }

    logoutHandler = () => {
        this.setState({
            currentUser: {},
            token: ''
        })
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('expiryDate');
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

    clickResultMessage = () => {
        this.setState({
            result: ''
        })
    }

    render(){
        return (
            <div className='ui container'>
                <Router history={history}>
                    <Header />
                    <div>
                        <Route path='/' exact component={Timeline} /> 
                        <Route path='/post' component={PostEdit} />
                        <Route path='/login' component={LogIn} />
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
                        <Route 
                            path='/signup' 
                            render={ props => 
                                <SignUp 
                                    addNewUser={this.addNewUser}
                                    {...props}
                                />
                            }
                        />
                        <Route path='/profile/:userName' exact component={Profile} />
                        <Route path='/profile/:userName/edit' component={ProfileEdit} />
                        {/* 
                            ↑ 「React Router v4 でルーティング先の component に Props を渡す方法」参照
                            https://ngzm.hateblo.jp/entry/2017/06/23/001352 
                        */}
                    </div>
                    <ErrorHandler 
                        result={this.state.result} 
                        clickResultMessage={this.clickResultMessage} 
                    />
                </Router>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        selectedUser: state.selectedUser.userData
    }
}

export default connect(
    mapStateToProps,
    { setUser, showAllTweets }
)(App);