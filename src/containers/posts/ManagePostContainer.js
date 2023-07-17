import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostFormComponent from '../../components/posts/PostFormComponent';
import postSelectors from '../../selectors/postSelectors';

import * as postActions from '../../actions/postActions';

class ManagePostContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: { ...this.props.post }
        }

        this.updateState = this.updateState.bind(this);
        this.savePost = this.savePost.bind(this);
        this.resetPost = this.resetPost.bind(this);
    }


    updateState(e) {
        const field = e.target.name;
        let post = { ...this.state.post };
        post[field] = e.target.value;
        this.setState({ post: post });
    }
    resetPost(e) {
        console.log('reset');
        let post = { ...this.state.post };
        console.log(post);
        post.name = '';
        post.description = '';
        this.setState({ post: post });
    }
    savePost(e) {
        e.preventDefault();

        if (this.state.post.id) {
            this.props.updatePost(this.state.post);
        } else {
            this.props.insertPost(this.state.post);
        }

        // this.props.history.push('/posts');
    }

    render() {
        return (
            <div>
                <PostFormComponent pageText={this.props.pText} post={this.state.post}
                    onChange={this.updateState} onSave={this.savePost} onReset={this.resetPost} />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    
    const postId = ownProps.match.params.id;
    let post = {
        id: "",
        name: "",
        description: "",
        status: ""
    };
    if (postId && state.postReducer.posts.length > 0) {
        post = postSelectors.getPostById(state, ownProps);
        console.log(post);
    }
    
    var pText = post.id === "" ? "Create Post" : "Edit Post";

    return {
        pText, post
    };
}

function mapDispatchToProps(dispatch) {
    return {
        insertPost: (post) => { dispatch(postActions.insertPost(post)); },
        updatePost: (post) => { dispatch(postActions.updatePost(post)); },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePostContainer);