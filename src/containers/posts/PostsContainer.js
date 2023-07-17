import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as postActions from '../../actions/postActions';

import LoaderAnimation from '../../components/common/LoaderAnimation';
import AddPostButton from '../../components/posts/AddPostButton';
import SearchPostComponent from '../../components/posts/SearchPostComponent';
import PostListComponent from '../../components/posts/PostListComponent';

class PostsContainer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            searchPost: '',
            currentPage: 1, 
            pageLimit: 10, 
        }
       
        this.updateState = this.updateState.bind(this);
        this.updatePost = this.updatePost.bind(this);
    }
    onPageChanged = data => {
       //console.log('onPageChanged');
        const { currentPage, pageLimit } = data;
        this.props.loadPosts(currentPage,pageLimit,this.state.searchPost);
        this.setState({ currentPage, pageLimit });
    }
    updateState(e) {
       this.setState({ searchPost:  e.target.value });
    }
    updatePost(e) {
        this.props.loadPosts(this.state.currentPage,this.state.pageLimit,this.state.searchPost);
     }
    render() {
        return (
            <>
                {
                   
                    this.props.flag ?
                        <>
                            <div className='mt-3 mb-3 col-3'>
                                <AddPostButton />
                            </div>
                            <div className='col-md-3 offset-md-9'>
                                <SearchPostComponent value={this.state.searchPost} onChange={this.updateState} 
                                onClick={this.updatePost} />
                            </div>
                            
                            <PostListComponent posts={this.props.posts}
                            currentPage={this.props.currentPage}
                            totalRecords={this.props.totalRecords} 
                            totalPages={this.props.totalPages} 
                            pageLimit={this.state.pageLimit} 
                            onDelete={
                                (p, e) => {
                                    this.props.deletePost(p);
                                }
                            } 
                            onPageChanged={this.onPageChanged }
                            />
                        </>
                        : <LoaderAnimation />
                }
            </>
        );
    }

    componentDidMount() {
        this.props.loadPosts(this.state.currentPage,this.state.pageLimit,'');
    }

}

function mapStateToProps(state, ownProps) {
    // console.log(state);
    return {
        posts: state.postReducer.posts,
        status: state.postReducer.status,
        flag: state.postReducer.flag,
        currentPage: state.postReducer.currentPage,
        totalRecords: state.postReducer.totalRecords,
        totalPages: state.postReducer.totalPages
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadPosts: (currentPage,pageLimit,searchValue='') => { 
            dispatch(postActions.loadPosts(currentPage,pageLimit,searchValue)); 
        },
        deletePost: (post) => { dispatch(postActions.deletePost(post)); }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);