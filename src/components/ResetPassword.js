import { connect } from 'react-redux';
import React, { Fragment } from 'react';

import { validateResetPage, resetPassword } from '../actions';
import FormEdit from './FormEdit.js';

class ResetPassword extends React.Component {

    state = { password: '', passwordConfirm: '', err: '' }

    componentDidMount = () => {
        this.props.validateResetPage(this.props.match.params.token);

    }
    
    onSubmitClick = e => {
        e.preventDefault();
        this.props.resetPassword(
            this.state.password, 
            this.state.passwordConfirm,
            this.props.match.params.token
        );
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
                    'トークンが無効です'
                }
                
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isValidToken: state.reset.isValidToken
    }
}

export default connect(
    mapStateToProps,
    { validateResetPage, resetPassword }
)(ResetPassword);