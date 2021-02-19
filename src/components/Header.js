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
                    <Link to="/" className="header item">Isotter - ホーム</Link>
                    <Link to="/post" className="item">投稿</Link>
                    <Link 
                        to={`/profile/${this.props.userName}`} 
                        onClick={this.onProfileButtonClick} 
                        className="item"
                    >
                        {this.props.userName} - プロフィール
                    </Link>
                    <Link 
                        to="/" 
                        className="item right" 
                        onClick={this.props.signOut}
                    >
                        ログアウト
                    </Link>
                </div>
            )
        } else {
            return (
                <div className="ui menu">
                    <Link to="/" className="header item">Isotter - ホーム</Link>
                    <Link to="/signup" className="item">サインアップ</Link> 
                    <Link to="/login" className="item right">ログイン</Link>
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