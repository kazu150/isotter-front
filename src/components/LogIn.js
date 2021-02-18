import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signIn, signOut, setError } from '../actions';

import history from '../history.js';

class LogIn extends React.Component {

    // ログインボタン押下時の挙動
    onSubmit = formValues => {

        // サインイン済みかどうか
        if(this.props.isSignedIn){
            this.props.setError({
                status: 403,
                errorMessage: 'すでにサインインしています'
            })
            return;
        }

        // ユーザー名は入力されているか
        if(!formValues.userName) {
            this.props.setError({
                status: 403,
                errorMessage: 'ユーザー名を入力してください'
            })
            return;
        }

        // パスワードは入力されているか
        if(!formValues.password) {
            this.props.setError({
                status: 403,
                errorMessage: 'パスワードを入力してください'
            })
            return;
        }

        // フロント側でバリデーション通れば、Actionに処理を渡す
        this.props.signIn(formValues.userName, formValues.password)
            .then(resData => {

                history.push('/');

                localStorage.setItem('token', this.props.token);
                localStorage.setItem('userId', this.props.userId);
                localStorage.setItem('userName', this.props.userName);

                // ログイントークンの有効期限を設定
                const remainingMilliseconds = 60*60*1000;
                const expiryDate = new Date(
                    new Date().getTime() + remainingMilliseconds
                );
                localStorage.setItem('expiryDate', expiryDate.toISOString())
                this.setAutoLogout(remainingMilliseconds);
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderInput = ({ input, label, placeholder, type }) => {
        return(
            <div className="field">
                <label>{label}</label>
                <input 
                    { ...input }
                    type={type} 
                    placeholder={placeholder} 
                />
            </div>
        );
    }

    render(){
        return (
            <form 
                className="ui form success"
                onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
                <div className="ui medium header">ログイン</div>
                <Field 
                    name="userName" 
                    label="ユーザー名" 
                    component={this.renderInput} 
                    placeholder="userName" 
                />
                <Field 
                    name="password" 
                    label="パスワード" 
                    component={this.renderInput} 
                    placeholder="password" 
                    type="password"
                />
                <button type="submit" className="ui submit button">
                    送信
                </button>
                <button 
                    onClick={() => history.push('/forgot-password')} 
                    style={{ marginLeft: '15px' }}
                    className="ui submit button"
                >
                    パスワードを忘れた場合
                </button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        isSignedIn: state.auth.isSignedIn,
        userName: state.auth.userName,
        userId: state.auth.userId,
        token: state.auth.token
    };
}

const formWrapped = reduxForm({
    form: 'login'
})(LogIn)

export default connect(
    mapStateToProps, 
    { signIn, signOut, setError }
)(formWrapped);