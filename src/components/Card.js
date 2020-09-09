import React from 'react';

const Card = props => {
    return(
        <div className="comment">
            <a className="avatar">
                <img src={props.thumbnail} alt={`avator of ${props.userName}`} />
            </a>
            <div className="content">
                <a onClick={() => props.onClickAuthorName(props.userName)} className="author">{props.userName}</a>
                <div className="text">{props.content}</div>
                <div className="actions">
                    <a className="reply">
                        <i className="reply icon"></i>
                        Reply
                    </a>
                    <a className="update">
                        <i className="edit icon"></i>
                        Update
                    </a>
                    {
                        props.currentUserName === props.userName ?
                        <a className="save" onClick={props.onDeleteClick}>
                            <i className="trash icon"></i>
                            Delete
                        </a> :
                        <a className="save" style={{'visibility': 'hidden'}}>
                            <i className="trash icon"></i>
                            Delete
                        </a> 
                    }
                    <a>
                        <i className="clock icon"></i>
                        {props.time}
                    </a>

                </div>
            </div>
        </div>
    );
}

export default Card;