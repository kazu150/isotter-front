import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { modUserData } from '../actions';
import history from '../history';

class ProfileEdit extends React.Component {

    // constructor(props){
    //     super(props);
    //     this.fileInput = React.createRef();
    // }

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
                    // もとはinputプロパティ全体をサーバに投げてたが、コメントアウトしていいのか
                    {...input}
                    type = {type}
                    placeholder = {placeholder}
                    // ref = {this.fileInput}
                />
            </div>
        );
    }

    renderFileUpload = (props) => {
        const { input, label } = props
        const onInputChange = (e) => {
            e.preventDefault();
            const files = [...e.target.files];
            input.onChange(files[0]);
        };
        return (
        <div className="field">
        <label>{label}</label>
            <input 
                type="file"
                onChange={onInputChange}
            />
        </div>
        )
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
                    component = {this.renderFileUpload}
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