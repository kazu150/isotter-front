import React from 'react';
import Card from './Card.js';

class Timeline extends React.Component {

    renderList = () => {
        return this.props.posts.map(post => {
            return(
                <Card 
                    currentUserName={this.props.currentUserName}
                    key={post._id}
                    thumbnail={post.userId.thumb} 
                    userName={post.userId.userName} 
                    onClickAuthorName={(e, userName) => this.props.onClickAuthorName(e, userName)}
                    content={post.content}
                    time={post.createdAt}
                    onDeleteClick={ (e) => this.props.onDeleteClick(e, post._id) }
                />
            )
        })
    }

    render(){
        return(
            <div className="ui comments">
                <div className="ui medium header">TimeLine</div>
                {this.renderList()}
            </div>
        );
    }
};

export default Timeline;