import React from 'react';
import history from '../history';
import FormEdit from './FormEdit'

class SignUp extends React.Component {

    state = {
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        err: ''
    }

    onSignupSubmit = e => {
        e.preventDefault();

        this.props.addNewUser(
            this.state.userName, 
            this.state.email,
            this.state.password,
            this.state.confirmPassword
        );
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
            <form onSubmit={this.onSignupSubmit} className='ui form success'>
                <div className="ui medium header">SignUp</div>
                <FormEdit 
                    className="field" 
                    title="UserName (at least 5 letters) *" 
                    placeholder="test123" 
                    value={this.state.userName} 
                    onChange={e => this.setState({ userName: e.target.value }) } 
                />
                <FormEdit 
                    className='field' 
                    title="E-mail *" 
                    placeholder='test@test.com' 
                    value={this.state.email} 
                    onChange={e => this.setState({ email: e.target.value }) } 
                />
                <FormEdit 
                    className="field" 
                    title="Password (at least 6 letters) *" 
                    placeholder="●●●●●●" 
                    type="password"
                    value={this.state.password} 
                    onChange={e => this.setState({ password: e.target.value }) } 
                />
                <FormEdit 
                    className="field" 
                    title="Password Confirmation *" 
                    placeholder="●●●●●●" 
                    type="password"
                    value={this.state.confirmPassword} 
                    onChange={e => this.setState({ confirmPassword: e.target.value }) } 
                />
                {this.renderErrorMessage()}
                <button className='ui submit button' type="submit">Submit</button>
            </form>
        )
    }
}

export default SignUp;