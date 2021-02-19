import React from 'react';
import { getUserData } from '../actions';
import { connect } from 'react-redux';
import history from '../history'

class Profile extends React.Component {

    componentDidMount = () => {
        this.props.getUserData(this.props.match.params.userName);
    }

    renderEditButton = () => {
        const loginUser = localStorage.getItem('userName');
        const browsedUser = this.props.match.params.userName;
        if(loginUser === browsedUser){
            return (
                <button 
                    onClick={() => history.push(`/profile/${loginUser}/edit`)} 
                    className='ui submit button'
                >
                    プロフィール編集
                </button>
            ) 
        }
    }

    render(){
        return (
            <div className="ui list">
                <div className="item">
                    <div className="header">ユーザー名</div>
                    {this.props.selectedUser.userName}
                </div>
                <br/>
                <div className="item">
                    <div className="header">メールアドレス</div>
                    {this.props.selectedUser.email}
                </div>
                <br/>
                <div className="item">
                    <div className="header">サムネイル</div>
                    <img 
                        src={this.props.selectedUser.thumb} 
                        alt={this.props.selectedUser.thumb}  
                        style={{ borderRadius: '10px', maxWidth: '300px', maxHeight: '300px' }}
                    />
                </div>
                <br/>
                <div className="item">
                    <div className="header">好きなフルーツ</div>
                    {this.props.selectedUser.fruit || 'none'}
                </div>
                <br/>
                {this.renderEditButton()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedUser: state.selectedUser
    }
}

export default connect(
    mapStateToProps,
    { getUserData }
)(Profile);