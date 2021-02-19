import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signUp, setError } from '../actions';

class SignUp extends React.Component {

    state = {
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        err: ''
    }

    renderInput = ({ input, label, placeholder, type }) => {
        return(
            <div className="field">
                <label>{label}</label>
                <input 
                    { ...input }
                    type={type} 
                    autoComplete="off"
                    placeholder={placeholder} 
                />
            </div>
        );
    }
    
    onSubmit = (formValues) => {
        
        // サインイン済みかどうか
        if(this.props.isSignedIn){
            this.props.setError({
                status: 403,
                errorMessage: 'すでにサインインしています'
            })
            return;
        }

        // ユーザー名は入力されているか
        if(!formValues.userName || formValues.userName.length < 5) {
            this.props.setError({
                status: 403,
                errorMessage: 'ユーザー名を5文字以上で入力してください'
            })
            return;
        }

        // Eメールは入力されているか
        if(!formValues.email) {
            this.props.setError({
                status: 403,
                errorMessage: 'Eメールを入力してください'
            })
            return;
        }

        // パスワードは入力されているか
        if(!formValues.password || formValues.password.length < 6) {
            this.props.setError({
                status: 403,
                errorMessage: 'パスワードを6文字以上で入力してください'
            })
            return;
        }
        
        // パスワードは入力されているか
        if(formValues.passwordConfirm !== formValues.password) {
            this.props.setError({
                status: 403,
                errorMessage: 'パスワードが一致しません'
            })
            return;
        }
        
        this.props.signUp(formValues);

    }

    renderErrorMessage = () => {
        if(this.state.err){
            return (
                <div className="ui negative message">
                    <div className="header">
                        Error!!!
                    </div>
                    <p>{this.state.err}</p>
                </div>
            )
        }
    }

    render(){
        return(
            <form 
                onSubmit={this.props.handleSubmit(this.onSubmit)} 
                className='ui form success'
            >
                <div className="ui medium header">サインアップ</div>
                <Field 
                    name="userName"
                    label="ユーザーネーム（５文字以上）【必須】"
                    placeholder="test123" 
                    component={this.renderInput}
                />
                <Field 
                    name="email"
                    label="Eメール【必須】"
                    placeholder='test@test.com' 
                    component={this.renderInput}
                />
                <Field 
                    name="password"
                    type="password"
                    autoComplete="off"
                    label="パスワード（６文字以上）【必須】"
                    placeholder="●●●●●●"
                    component={this.renderInput}
                />
                <Field 
                    name="passwordConfirm"
                    type="password"
                    autoComplete="off"
                    label="パスワード（確認）"
                    placeholder="●●●●●●"
                    component={this.renderInput}
                />
                {this.renderErrorMessage()}
                <button className='ui submit button' type="submit">送信</button>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
}

const formWrapped = reduxForm({
    form: 'signUp'
})(SignUp)

export default connect(
    mapStateToProps,
    { signUp, setError }
)(formWrapped);