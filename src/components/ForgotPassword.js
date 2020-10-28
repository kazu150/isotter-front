import React from 'react';
import { connect } from 'react-redux';
import { sendPasswordResetRequest } from '../actions';
import FormEdit from './FormEdit.js';

class ForgotPassword extends React.Component {

    state = { email: '', err: '' }

    // sendPasswordResetMail = email => {
    //     const method = 'POST';

    //     if(!email){
    //         return this.setState({
    //             err: {
    //                 status: 404,
    //                 message: 'emailを入力してください'
    //             }
    //         })
    //     }

    //     fetch(env.API_ORIGIN + 'admin/reset-password', {
    //         method: method,
    //         headers: {
    //             'Content-Type':'application/json'
    //         },
    //         body: JSON.stringify({
    //             email: email
    //         })
    //     })
    //     .then(res => {
    //         if(res.status === 404){
    //             const error = new Error('メールアドレスが登録されていないか、有効なメールアドレスの形式が有効ではありません') 
    //             error.status = res.status;
    //             throw error;
    //         }else if(res.status === 500){
    //             const error = new Error('サーバ側の何らかの理由でメールが送信できませんでした。時間を空けてお試しください') 
    //             error.status = res.status;
    //             throw error;
    //         }else if(res.status!== 200 && res.status !== 201){
    //             const error = new Error('サーバー側のなにかのエラー') 
    //             error.status = res.status;
    //             throw error;
    //         }
    //         return res.json()
    //     })
    //     .then(resData => {
    //         this.setState({
    //             result: `メールアドレス：${resData.email}宛にメッセージを送りました。メール内のURLから、パスワード再設定をお願いします。`
    //         })
    //     })
    //     .catch(err => {
    //         this.setState({
    //             err: {
    //                 status: err.status,
    //                 message: err.message
    //             }
    //         })
    //     })
    // }

    onSubmitClick = e => {
        e.preventDefault();
        this.props.sendPasswordResetRequest(this.state.email);
    }

    renderErrorMessage = () => {
        if(this.state.err){
            return(
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
        return (
            <form 
                className="ui form success"
                onSubmit={this.onSubmitClick}
            >
                <div className="ui medium header">パスワードを忘れた場合 (パスワードリセットリクエストを送る)</div>
                <p>Isotterに登録済みのメールアドレスを入力してください。</p>
                <FormEdit 
                    className="field" 
                    title="email" 
                    placeholder="test123@test123.com" 
                    name="email" 
                    value={this.state.email} 
                    onChange={ e => this.setState({ email: e.target.value })} 
                />
                {this.renderErrorMessage()}
                <button type="submit" className="ui submit button">
                    Submit
                </button>
            </form>
        );
    }
}

export default connect(
    null,
    { sendPasswordResetRequest }
)(ForgotPassword);