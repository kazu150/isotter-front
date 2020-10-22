import React from 'react';
import { connect } from 'react-redux';

const Card = props => {
    return(
        <div className="comment">
            <a href="/#" onClick={e => e.preventDefault()} className="avatar">
                <img src={props.thumbnail} alt={`avator of ${props.userName}`} />
            </a>
            <div className="content">
                <a href="/#" onClick={(e) => props.onClickAuthorName(e, props.userName)} className="author">{props.userName}</a>
                <div className="text">{props.content}</div>
                <div className="actions">
                    <a href="/#" onClick={e => e.preventDefault()} className="reply">
                        <i className="reply icon"></i>
                        Reply
                    </a>
                    <a href="/#" onClick={e => e.preventDefault()} className="update">
                        <i className="edit icon"></i>
                        Update
                    </a>
                    {
                        props.currentUserName === props.userName ?
                        <a href="/#" className="save" onClick={e => props.onDeleteClick(e, props.id )}>
                            <i className="trash icon"></i>
                            Delete
                        </a> :
                        <a href="/#" onClick={e => e.preventDefault()} className="save" style={{'visibility': 'hidden'}}>
                            <i className="trash icon"></i>
                            Delete
                        </a> 
                    }
                    <a href="/#" onClick={e => e.preventDefault()}>
                        <i className="clock icon"></i>
                        {props.time}
                    </a>

                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        currentUserName: state.auth.userName
    }
}

export default connect(
    mapStateToProps,
    null
)(Card);