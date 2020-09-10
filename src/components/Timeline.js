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
                    onClickAuthorName={(userName) => this.props.onClickAuthorName(userName)}
                    content={post.content}
                    time={post.createdAt}
                    onDeleteClick={ () => this.props.onDeleteClick(post._id) }
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