import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { tweet } from '../actions';

class PostEdit extends React.Component {

    renderError = ({error, touched}) => {
        if(touched && error){
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        return (
            <div className='field'>
                <label>{label}</label>
                <textarea {...input} autoComplete="off" ></textarea>
                {this.renderError(meta)}
            </div>
        ); 
    }

    onSubmit = formValues => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        this.props.tweet(formValues, userId, token);
    }

    render(){
        return(
            <form 
                onSubmit={this.props.handleSubmit(this.onSubmit)} 
                className='ui form error'
            >
                <div className="ui medium header">Write a post</div>
                <Field name="content" label="ツイートを書く" component={this.renderInput} />
                <button className='ui submit button'>Submit</button>
            </form>
        );
    };
}

const validate = (formValues) => {
    const errors = {};

    if(!formValues.content) {
        errors.content = 'ツイートを入力してください';
    }

    return errors;
}

const formWrapped = reduxForm({
    form: 'post',
    validate
})(PostEdit);

export default connect(
    null,
    { tweet }
)(formWrapped);