import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signUp } from '../actions';

class SignUp extends React.Component {

    state = {
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        err: ''
    }

    // addNewUser = async (userName, email, password, confirmPassword) => {
        // try{
        //     const method = 'PUT';
        //     if(password !== confirmPassword){
        //         const error = new Error('パスワードが違います') 
        //         error.status = 422;
        //         throw error;
        //     }
            
        //     const res = await fetch(env.API_ORIGIN + 'admin/signup', {
        //         method: method,
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             userName: userName,
        //             email: email,
        //             password: password,
        //             confirmPassword: confirmPassword,
        //             thumb: 'http://ipu-corp.com/wp-content/uploads/sites/17/2017/09/human-icon-big.png',
        //         })
        //     })

        //     // 不明箇所ID:[0001]ここで本来、サーバサイドから引き継いだエラーメッセージを表示したい
        //     if(res.status === 403){
        //         const error = new Error('すでにそのユーザーネームは使われています') 
        //         error.status = res.status;
        //         throw error;
        //     }else if(res.status!== 200 && res.status !== 201){
        //         const error = new Error('サーバー側のなにかのエラー') 
        //         error.status = res.status;
        //         throw error;
        //     }
        //     history.push('/login');
        //     this.setState({
        //         result:'ユーザ登録完了'
        //     })

        // }catch(err){
        //     this.setState({
        //         err: {
        //             status: err.status,
        //             message: err.message
        //         }
        //     })
        // }

    // }

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
    
    onSubmit = (formValues) => {

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
                <div className="ui medium header">SignUp</div>
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
                    label="パスワード（６文字以上）【必須】"
                    placeholder="●●●●●●"
                    component={this.renderInput}
                />
                <Field 
                    name="passwordConfirm"
                    type="password"
                    label="パスワード（確認）"
                    placeholder="●●●●●●"
                    component={this.renderInput}
                />
                {this.renderErrorMessage()}
                <button className='ui submit button' type="submit">Submit</button>
            </form>
        )
    }
}

const formWrapped = reduxForm({
    form: 'signUp'
})(SignUp)

export default connect(
    null,
    { signUp }
)(formWrapped);