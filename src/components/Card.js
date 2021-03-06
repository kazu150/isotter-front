import React from 'react';
import { connect } from 'react-redux';

const Card = props => {
    const splittedDate = props.time.split(/-|_|T|:|\./)
    const formedDate = `${splittedDate[0]}/${splittedDate[1]}/${splittedDate[2]} ${splittedDate[3]}:${splittedDate[4]}`

    return(
        <div className="comment">
            <a href="/#" onClick={(e) => props.onClickAuthorName(e, props.userName)} className="avatar">
                <img src={props.thumbnail} alt={`avator of ${props.userName}`} />
            </a>
            <div className="content">
                <a href="/#" onClick={(e) => props.onClickAuthorName(e, props.userName)} className="author">{props.userName}</a>
                <div className="text">{props.content}</div>
                <div className="actions">
                    <a href="/#" style={{ cursor: 'default', color: 'rgba(0,0,0,.4)' }} onClick={e => e.preventDefault()}>
                        <i className="clock icon"></i>
                        {formedDate}
                    </a>
                    {
                        props.currentUserName === props.userName &&
                        <a href="/#" className="save" onClick={e => props.onDeleteClick(e, props.id )}>
                            <i className="trash icon"></i>
                            Delete
                        </a>
                    }

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