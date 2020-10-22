import React from 'react';
import { connect } from 'react-redux';
import { signOut, getUserData } from '../actions';
import { Link } from 'react-router-dom';

class Header extends React.Component {

    onProfileButtonClick = () => {
        this.props.getUserData(this.props.userName)
    }

    renderHeaderList = () => {
        if(this.props.isSignedIn){
            return (
                <div className="ui menu">
                    <Link to="/" className="header item">Isotter - Home</Link>
                    <Link to="/post" className="item">Post</Link>
                    <Link 
                        to={`/profile/${this.props.userName}`} 
                        onClick={this.onProfileButtonClick} 
                        className="item"
                    >
                        {this.props.userName} - Profile
                    </Link>
                    <Link 
                        to="/" 
                        className="item right" 
                        onClick={this.props.signOut}
                    >
                        Log Out
                    </Link>
                </div>
            )
        } else {
            return (
                <div className="ui menu">
                    <Link to="/" className="header item">Isotter - Home</Link>
                    <Link to="/signup" className="item">Sign Up</Link> 
                    <Link to="/login" className="item right">Log In</Link>
                </div>
            )
        }
    }

    render(){
        return(
            <React.Fragment>
                {this.renderHeaderList()}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return { 
        isSignedIn: state.auth.isSignedIn,
        userName: state.auth.userName
    };
}

export default connect(
    mapStateToProps,
    { signOut, getUserData }
)(Header);