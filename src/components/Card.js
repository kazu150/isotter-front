import React from 'react';

const Card = props => {
    return(
        <div className="comment">
            <a href="/#" className="avatar">
                <img src={props.thumbnail} alt={`avator of ${props.userName}`} />
            </a>
            <div className="content">
                <a href="/#" onClick={() => props.onClickAuthorName(props.userName)} className="author">{props.userName}</a>
                <div className="text">{props.content}</div>
                <div className="actions">
                    <a href="/#" className="reply">
                        <i className="reply icon"></i>
                        Reply
                    </a>
                    <a href="/#" className="update">
                        <i className="edit icon"></i>
                        Update
                    </a>
                    {
                        props.currentUserName === props.userName ?
                        <a href="/#" className="save" onClick={props.onDeleteClick}>
                            <i className="trash icon"></i>
                            Delete
                        </a> :
                        <a href="/#" className="save" style={{'visibility': 'hidden'}}>
                            <i className="trash icon"></i>
                            Delete
                        </a> 
                    }
                    <a href="/#">
                        <i className="clock icon"></i>
                        {props.time}
                    </a>

                </div>
            </div>
        </div>
    );
}

export default Card;