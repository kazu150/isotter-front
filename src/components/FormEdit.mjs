import React from 'react';

const FormEdit = props => {
    return(
        <div className="field">
            <label>{props.title}</label>
            <input 
                type={props.type || 'text'} 
                name={props.name || 'default'} 
                value={props.type === 'file' ? undefined : props.value}
                onChange={props.onChange} 
                placeholder={props.placeholder || 'default'} 
            />
        </div>
    )
}

export default FormEdit;