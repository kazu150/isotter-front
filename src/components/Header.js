import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {

    renderHeaderList = () => {
        if(this.props.isAuth){
            return (
                <div className="ui menu">
                    <Link to="/" className="header item">Isotter - Home</Link>
                    <Link to="/post" className="item">Post</Link>
                    <Link to={`/profile/${this.props.userName}`} onClick={this.props.onProfileButtonClick} className="item">{this.props.userName} - Profile</Link>
                    <Link to="/" className="item right" onClick={this.props.onLogoutClick}>Log Out</Link>
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

export default Header;