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
    
    // renderPosts = () => {

    //     fetch(env.API_ORIGIN + 'timeline/posts',{
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then(res => {
    //         if(res.status!== 200 && res.status !== 201){
    //             const error = new Error('サーバー側のなにかのエラー') 
    //             error.status = res.status;
    //             throw error;
    //         }
    //         return res.json();
    //     })
    //     .then(resData => {
    //         resData.posts.map(post => {
    //             post.userId.thumb = env.API_ORIGIN + post.userId.thumb;
    //             return post;
    //         })

    //         // 昇順降順の調整（https://qiita.com/PianoScoreJP/items/f0ff7345229871039672）
    //         const posts = resData.posts.sort(function(a,b){
    //             if(a._id>b._id) return -1;
    //             if(a._id < b._id) return 1;
    //             return 0;
    //         });
    //         this.setState({posts: posts})

    //     })
    //     .catch(err => {
    //         this.setState({
    //             err: {
    //                 status: err.status,
    //                 message: err.message
    //             }
    //         })
    //     })
    // }

    onDeleteClick = (e, postId) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        this.props.deletePost(postId, token);

    //     const method = 'DELETE';

    //     fetch(env.API_ORIGIN + 'timeline/post', {
    //         method: method,
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + this.state.token
    //         },
    //         body: JSON.stringify({
    //             postId: postId
    //         })
    //     })
    //     .then(res => {
    //         if(res.status!== 200 && res.status !== 201){
    //             const error = new Error('サーバー側のなにかのエラー') 
    //             error.status = res.status;
    //             throw error;
    //         }
    //         return res.json()
    //     })
    //     .then(resData => {
    //         let posts = this.state.posts;
    //         posts = posts.filter((obj) => {
    //             return obj._id !== resData.deletedPost._id;
    //         });
    //         this.setState({
    //             posts: posts
    //         });
    //     })
    //     .catch(err => {
    //         this.setState({
    //             err: {
    //                 status: err.status,
    //                 message: err.message
    //             }
    //         })
    //     })
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
                <div className="ui medium header">TimeLine</div>
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