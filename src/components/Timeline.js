import React from 'react';
import { connect } from 'react-redux';
import { deletePost, showAllTweets } from '../actions';

import Card from './Card.js';
import history from '../history';

class Timeline extends React.Component {

    componentDidMount(){
        this.props.showAllTweets();
    }

    onClickAuthorName = (e, userName) => {
        e.preventDefault();
        history.push(`/profile/${userName}`);
    }

    onDeleteClick = (e, postId) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        this.props.deletePost(postId, token);

    }

    renderList = () => {
        return this.props.tweets.map(tweet => {
            return(
                <Card 
                    currentUserName={this.props.currentUserName}
                    id={tweet._id}
                    key={tweet._id}
                    thumbnail={tweet.userId.thumb} 
                    userName={tweet.userId.userName} 
                    onClickAuthorName={ ( e, userName ) => this.onClickAuthorName(e, userName) }
                    content={tweet.content}
                    time={tweet.createdAt}
                    onDeleteClick={ (e, id) => this.onDeleteClick(e, id) }
                />
            )
        })
    }

    render(){
        return(
            <div className="ui comments">
                <div className="ui medium header">タイムライン</div>
                {this.renderList()}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        tweets: state.timeline.allTweets
    }
}

export default connect(
    mapStateToProps,
    { deletePost, showAllTweets }
)(Timeline);