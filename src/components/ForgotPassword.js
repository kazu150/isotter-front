import React from 'react';
import FormEdit from './FormEdit';
import history from '../history';

class ForgotPassword extends React.Component {

    state = { email: '', err: '' }

    onSubmitClick = e => {
        e.preventDefault();
        this.props.sendPasswordResetMail(this.state.email);
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
                <div className="ui medium header">Forgot Password (Submit a reset request)</div>
                <p>Enter the email address you use to sign in on Isotter.</p>
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

export default ForgotPassword;