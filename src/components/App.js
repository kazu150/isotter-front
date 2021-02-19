import React from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { setUser, showAllTweets, signOut } from '../actions'
import Header from './Header';
import Timeline from './Timeline';
import PostEdit from './PostEdit';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import LogIn from './LogIn';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import SignUp from './SignUp'; 
import ErrorHandler from './ErrorHandler';
import history from '../history';

class App extends React.Component {

    componentDidMount(){
        const expiryDate = localStorage.getItem('expiryDate');
        const token  = localStorage.getItem('token');
        const userName = localStorage.getItem('userName');
        const userId = localStorage.getItem('userId');
        console.log(process.env.NODE_ENV)

        if(new Date(expiryDate) <= new Date()){
            this.props.signOut();
        } else if(token) {
            this.props.setUser(userName, userId, token);
            const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
            this.setAutoLogout(remainingMilliseconds);
        }
        this.props.showAllTweets();
    }

    setAutoLogout = milliseconds => {
        setTimeout(() => {
            this.props.signOut();
        }, milliseconds);
    };

    render(){
        return (
            <div className='ui container'>
                <Router history={history}>
                    <Header />
                    <div>
                        <Route path='/' exact component={Timeline} /> 
                        <Route path='/post' component={PostEdit} />
                        <Route
                            path='/login'
                            render={props => <LogIn setAutoLogout={this.setAutoLogout} {...props} />}
                        />
                        <Route path='/forgot-password' component={ForgotPassword} />
                        <Route path='/reset-password/:token' component={ResetPassword} />
                        <Route path='/signup' component={SignUp} />
                        <Route path='/profile/:userName' exact component={Profile} />
                        <Route path='/profile/:userName/edit' component={ProfileEdit} />
                    </div>
                    <ErrorHandler />
                </Router>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        selectedUser: state.selectedUser.userData
    }
}

export default connect(
    mapStateToProps,
    { setUser, showAllTweets, signOut }
)(App);