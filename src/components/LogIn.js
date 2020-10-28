import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

import history from '../history.js';

class LogIn extends React.Component {

    onSubmit = formValues => {

        if(this.props.isSignedIn){
            return;
        }

        this.props.signIn(formValues.userName, formValues.password)
            .then(resData => {

                history.push('/');

                localStorage.setItem('token', this.props.token);
                localStorage.setItem('userId', this.props.userId);
                localStorage.setItem('userName', this.props.userName);

                const remainingMilliseconds = 60*60*1000;
                const expiryDate = new Date(
                    new Date().getTime() + remainingMilliseconds
                );
                localStorage.setItem('expiryDate', expiryDate.toISOString())
                this.setAutoLogout(remainingMilliseconds);
            })
            .catch(err => {})
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
                <div className="ui medium header">Login</div>
                <Field 
                    name="userName" 
                    label="UserName" 
                    component={this.renderInput} 
                    placeholder="namename" 
                />
                <Field 
                    name="password" 
                    label="Password" 
                    component={this.renderInput} 
                    placeholder="pwpwpw" 
                    type="password"
                />
                <button type="submit" className="ui submit button">
                    Submit
                </button>
                <button 
                    onClick={() => history.push('/forgot-password')} 
                    style={{ marginLeft: '15px' }}
                    className="ui submit button"
                >
                    Forgot password?
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
    { signIn, signOut }
)(formWrapped);