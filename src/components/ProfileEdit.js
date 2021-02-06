import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { modUserData } from '../actions';
import history from '../history';

class ProfileEdit extends React.Component {

    onSubmit = async ( formValues ) => {

        const token = localStorage.getItem('token');

        this.props.modUserData(formValues, token)
            .then(resData => {
                localStorage.setItem('userId', resData._id);
                localStorage.setItem('userName', resData.userName);
                history.push(`/profile/${resData.userName}`);
            })
            .catch(err => {})
    }
    
    renderInput = ({ input, label, placeholder, type }) => {
        return(
            <div className ="field">
                <label>{label}</label>
                <input
                    {...input}
                    // Type "file"に対してはvalueを空文字としておく必要がある
                    value={type === 'file' ? "" : input.value}
                    type = {type}
                    placeholder = {placeholder}
                />
            </div>
        );
    }

    render(){
        return (
            <form 
                className='ui form success'
                onSubmit={this.props.handleSubmit(this.onSubmit)} 
            >
                <div className="ui medium header">Edit Profile of "{this.props.match.params.userName}"</div>
                <Field 
                    label="ユーザーネーム *" 
                    name ="userName"
                    component = {this.renderInput}
                    placeholder = "namename"
                />
                <Field 
                    label="メールアドレス *"
                    name ="email"
                    component = {this.renderInput}
                    placeholder = "mailmail"
                />
                <Field 
                    label="サムネイル *"
                    name="thumb"
                    type="file"
                    component = {this.renderInput}
                    placeholder="test@test.com" 
                />
                <Field 
                    label="パスワード (６文字以内。パスワードの変更を完了するには、メール認証が必要です) *" 
                    name="password"
                    type="password"
                    component = {this.renderInput}
                    placeholder="●●●●●●" 
                />
                <Field 
                    label="パスワード（確認） *" 
                    name="passwordConfirm"
                    type="password"
                    component = {this.renderInput}
                    placeholder="●●●●●●" 
                />
                <Field 
                    label="好きなフルーツ" 
                    name="fruit"
                    component = {this.renderInput}
                    placeholder="Orange" 
                />
                <button type="submit" className='ui submit button red'>Update</button>
            </form>
        );

    }
}

const mapStateToProps = ( state ) => {
    return {
        selectedUser: state.selectedUser,
        initialValues: { 
            _id: state.selectedUser._id,
            userName: state.selectedUser.userName,
            email: state.selectedUser.email,
            thumb: null,
            password: null,
            passwordConfirm: null,
            fruit: state.selectedUser.fruit || null
        }
    }
}

const formWrapped = reduxForm({
    form: 'profile',
    enableReinitialize: true
}, mapStateToProps )(ProfileEdit);

export default connect(
    mapStateToProps,
    { modUserData }
)(formWrapped);