import React from 'react';
import FormEdit from './FormEdit';
import history from '../history';

class LogIn extends React.Component {

    state = { userName: '', password: '', err: '' }

    onLoginClick = e => {
        e.preventDefault();
        this.props.onLoginSubmit(this.state.userName, this.state.password);
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

    onForgotClick = () => {
        history.push('/forgot-password')
    }

    render(){
        return (
            <form 
                className="ui form success"
                onSubmit={this.onLoginClick}
            >
                <div className="ui medium header">Login</div>
                <FormEdit 
                    className="field" 
                    title="UserName" 
                    placeholder="test123" 
                    name="userName" 
                    value={this.state.userName} 
                    onChange={ e => this.setState({ userName: e.target.value })} 
                />
                <FormEdit 
                    className="field" 
                    title="Password" 
                    type="password"
                    placeholder="●●●●●●" 
                    name={this.state.password} 
                    onChange={ e => this.setState({ password: e.target.value })} 
                />
                {this.renderErrorMessage()}
                <button type="submit" className="ui submit button">
                    Submit
                </button>
                <a 
                    onClick={this.onForgotClick} 
                    style={{
                        display: 'block', 
                        marginTop: '15px', 
                        cursor: 'pointer'
                    }}
                >
                    Forgot password?
                </a>
            </form>
        );
    }
}

export default LogIn;