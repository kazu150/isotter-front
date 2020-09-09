import React, { Fragment } from 'react';
import FormEdit from './FormEdit';
import history from '../history';

class ResetPassword extends React.Component {

    state = { password: '', passwordConfirm: '', err: '' }

    onSubmitClick = e => {
        e.preventDefault();
        this.props.resetPassword(
            this.state.password, 
            this.state.passwordConfirm,
            this.props.match.params.token
        );
    }

    componentDidMount = () => {
        this.props.validateResetPage(this.props.match.params.token)
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
            <Fragment>
                {this.props.isValidToken ?
                    <form 
                        className="ui form success"
                        onSubmit={this.onSubmitClick}
                    >
                        <div className="ui medium header">Reset Password</div>
                        <p>Enter the new password!</p>
                        <FormEdit 
                            className="field" 
                            title="Password (at least 6 letters. Please check your email to validate password change) *" 
                            type="password"
                            name="password"
                            value={this.state.password} 
                            onChange={e => this.setState({password: e.target.value})}
                            placeholder="●●●●●●" />
                        <FormEdit 
                            className="field" 
                            title="Password Confirmation *" 
                            type="password"
                            name="passwordConfirm"
                            value={this.state.passwordConfirm} 
                            onChange={e => this.setState({passwordConfirm: e.target.value})}
                            placeholder="●●●●●●" />
                        {this.renderErrorMessage()}
                        <button type="submit" className="ui submit button">
                            Submit
                        </button>
                    </form> : 
                    ''
                }
                
            </Fragment>
        );
    }
}

export default ResetPassword;