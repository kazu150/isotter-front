import React from 'react';
import FormEdit from './FormEdit';
import history from '../history';

class Profile extends React.Component {

    state = {
        user: this.props.selectedUser,
        pwConfirm: '',
        fruit: '',
        err: ''
    }

    componentDidMount = () => {
        this.props.getUser(this.props.match.params.userName);
    }

    renderEditButton = () => {
        const loginUser = localStorage.getItem('userName');
        const browsedUser = this.props.match.params.userName;
        if(loginUser === browsedUser){
            return (
                <button onClick={this.onEditClick} className='ui submit button'>Edit</button>
            ) 
        }
    }

    onEditClick = (e) => {
        e.preventDefault();
        this.props.onRenderEditPage(this.state.user, this.props.match.params.userName);
    }

    render(){
        return (
            <div className="ui list">
                <div className="item">
                    <div className="header">UserName</div>
                    {this.props.selectedUser.userName}
                </div>
                <br/>
                <div className="item">
                    <div className="header">E-mail</div>
                    {this.props.selectedUser.email}
                </div>
                <br/>
                <div className="item">
                    <div className="header">Thumbnail</div>
                    <img 
                        src={this.props.selectedUser.thumb} 
                        alt={this.props.selectedUser.thumb}  
                        style={{ borderRadius: '10px', maxWidth: '300px', maxHeight: '300px' }}
                    />
                </div>
                <br/>
                <div className="item">
                    <div className="header">Favorite Fruit</div>
                    {this.props.selectedUser.fruit || 'none'}
                </div>
                <br/>
                {this.renderEditButton()}
            </div>
        );
    }
}

export default Profile;