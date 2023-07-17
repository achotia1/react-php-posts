import * as actionTypes from './actionTypes';

import postAPIClient from '../services/post-api-client';
import history from '../utilities/history';

// Action Creator
function loadPostsRequested(msg) {
    // Create and Return an Action Object
    return {
        type: actionTypes.LOAD_POSTS_REQUESTED,
        payload: { message: msg, flag: false }
    };
}

// Action Creator
function loadPostsSuccess(posts, msg) {
    // Create and Return an Action Object
    // console.log('loadPostsSuccess');
    // console.log(posts);

    return {
        type: actionTypes.LOAD_POSTS_SUCCESS,
        payload: { data: posts.posts, message: msg, flag: true, currentPage: posts.currentPage, totalRecords: posts.totalRecords, totalPages: posts.totalPages }
    };
}

// Action Creator
function loadPostsFailed(msg) {
    // Create and Return an Action Object
    return {
        type: actionTypes.LOAD_POSTS_FAILED,
        payload: { message: msg, flag: true }
    };
}

export function loadPosts(currentPage,pageLimit,searchValue='') {
    return function (dispatch) {
        dispatch(loadPostsRequested("Posts Request Started..."));

        postAPIClient.getAllPosts(currentPage,pageLimit,searchValue).then(posts => {
            // console.log(posts);
            // console.log(posts.currentPage);
            // console.log(posts.totalRecords);
            setTimeout(() => {
                dispatch(loadPostsSuccess(posts, "Posts Request Completed..."));
            }, 5000);
        }).catch(eMsg => {
            dispatch(loadPostsFailed(eMsg));
        });
    }
}

// ----------------------------------------------------------- INSERT
// Action Creator
function insertPostSuccess(post, msg) {
    // Create and Return an Action Object
    return {
        type: actionTypes.INSERT_POST_SUCCESS,
        payload: { data: post, message: msg, flag: true }
    };
}

export function insertPost(post) {
    return function (dispatch) {
        // To Do - Insert Requested

        postAPIClient.insertPost(post).then(insertedPost => {
            dispatch(insertPostSuccess(insertPost, "Post Inserted Successfully..."));
            history.push('/admin/posts');
        }).catch(eMsg => {
            console.error(eMsg);
            // To Do Insert Failed
        });
    }
}

// ----------------------------------------------------------- UPDATE
// Action Creator
function updatePostSuccess(postData, msg) {
    // Create and Return an Action Object
   

    return {
        type: actionTypes.UPDATE_POST_SUCCESS,
        payload: { data: postData.posts, message: msg, flag: true }
    };
}

export function updatePost(post) {
    return function (dispatch) {
        // To Do - Update Requested

        postAPIClient.updatePost(post).then(updatedPost => {
            dispatch(updatePostSuccess(updatedPost, "Post Updated Successfully..."));
            history.push('/admin/posts');
        }).catch(eMsg => {
            console.error(eMsg);
            // To Do - Update Failed
        });
    }
}

// ----------------------------------------------------------- DELETE
// Action Creator
function deletePostSuccess(postData, msg) {
    // Create and Return an Action Object
    return {
        type: actionTypes.DELETE_POST_SUCCESS,
        payload: { data: postData.posts, message: msg, flag: true }
    };
}

export function deletePost(post) {
    return function (dispatch) {
        // To Do - Delete Requested

        postAPIClient.deletePost(post).then(deletePost => {
            dispatch(deletePostSuccess(deletePost, "Post Deleted Successfully..."));
        }).catch(eMsg => {
            console.error(eMsg);
            // To Do - Delete Failed
        });
    }
}