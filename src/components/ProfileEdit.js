import React from 'react';
import FormEdit from './FormEdit';
import history from '../history';

class ProfileEdit extends React.Component {

    state = {
        user: {...this.props.selectedUser},
        oldUser: {...this.props.selectedUser},
        pwConfirm: '',
        fruit: '',
        err: ''
    }

    componentDidMount =  () => {
        this.props.getUser(this.props.match.params.userName)
    }

    onUpdateSubmit = (e) => {
        e.preventDefault();
        this.props.updateUser(this.state.oldUser, this.state.user);
        this.setState({
            user: {...this.props.selectedUser},
            oldUser: {...this.props.selectedUser}
        })
    }

    onStatusChange = e => {
        const user = this.state.user;
        const targetKey = e.target.name;
        if(e.target.type === 'file'){
            user[targetKey] = e.target.files;
        }else{
            user[targetKey] = e.target.value;
        }
        this.setState({
            user: {...user}
        })
    }

    render(){
        return (
            <form onSubmit={this.onUpdateSubmit} className='ui form success'>
                <div className="ui medium header">Edit Profile of "{this.props.match.params.userName}"</div>
                <FormEdit 
                    className="field" 
                    title="UserName (at least 5 letters) *" 
                    name="userName"
                    value={this.state.user.userName} 
                    onChange={this.onStatusChange}
                    placeholder="test123" 
                />
                <FormEdit 
                    className="field" 
                    title="E-mail *" 
                    name="email"
                    value={this.state.user.email} 
                    onChange={this.onStatusChange}
                    placeholder="test@test.com" 
                />
                <FormEdit 
                    className="field" 
                    title="Thumbnail *"
                    name="thumb"
                    type="file"
                    value={this.state.user.thumb}
                    onChange={this.onStatusChange}
                    placeholder="test@test.com" 
                />
                <FormEdit 
                    className="field" 
                    title="Password (at least 6 letters. Please check your email to validate password change) *" 
                    type="password"
                    name="password"
                    value={this.state.user.password} 
                    onChange={this.onStatusChange}
                    placeholder="●●●●●●" />
                <FormEdit 
                    className="field" 
                    title="Password Confirmation *" 
                    type="password"
                    name="passwordConfirm"
                    value={this.state.user.passwordConfirm} 
                    onChange={this.onStatusChange}
                    placeholder="●●●●●●" />
                <FormEdit 
                    className="field" 
                    title="Favorite Fruit" 
                    name="fruit"
                    value={this.state.user.fruit} 
                    onChange={this.onStatusChange}
                    placeholder="Orange" />
                <button type="submit" className='ui submit button red'>Update</button>
            </form>
        );
    }
}

export default ProfileEdit;