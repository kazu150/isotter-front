import React from 'react';
import { connect } from 'react-redux';
import { sendPasswordResetRequest } from '../actions';
import FormEdit from './FormEdit.js';

class ForgotPassword extends React.Component {

    state = { email: '', err: '' }

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
                    title="メールアドレス" 
                    placeholder="test123@test123.com" 
                    name="email" 
                    value={this.state.email} 
                    onChange={ e => this.setState({ email: e.target.value })} 
                />
                {this.renderErrorMessage()}
                <button type="submit" className="ui submit button">
                    送信
                </button>
            </form>
        );
    }
}

export default connect(
    null,
    { sendPasswordResetRequest }
)(ForgotPassword);