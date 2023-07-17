// Reducer is a Pure Function
// A reducer is a function that determines changes to an application's state.
// It uses the action it receives via dispatcher, to determine this change. 

import * as actionTypes from '../actions/actionTypes';
import initialState from "./initialState";

const postReducer = (state = initialState.postsData, action) => {
    switch (action.type) {
        case actionTypes.LOAD_POSTS_REQUESTED:
        case actionTypes.LOAD_POSTS_FAILED:
            return {
                posts: [...state.posts],
                status: action.payload.message,
                flag: action.payload.flag,
                currentPage: action.payload.currentPage,
                totalRecords: action.payload.totalRecords,
                totalPages: action.payload.totalPages
            }
        case actionTypes.LOAD_POSTS_SUCCESS:
            return {
                posts: [...action.payload.data],
                status: action.payload.message,
                flag: action.payload.flag,
                currentPage: action.payload.currentPage,
                totalRecords: action.payload.totalRecords,
                totalPages: action.payload.totalPages
            }
        case actionTypes.INSERT_POST_SUCCESS:
            return {
                posts: [...state.posts, { ...action.payload.data }],
                status: action.payload.message,
                flag: action.payload.flag
            }
        case actionTypes.UPDATE_POST_SUCCESS:
            var itemIndex = state.posts.findIndex(p => p.id === parseInt(action.payload.data.id));
            var tempPosts = [...state.posts];
            tempPosts.splice(itemIndex, 1, { ...action.payload.data });
            return {
                posts: [...tempPosts],
                status: action.payload.message,
                flag: action.payload.flag
            }
        case actionTypes.DELETE_POST_SUCCESS:
            console.log(action);
            return {
                posts: [...state.posts.filter(p => p.id !== action.payload.data.id)],
                status: action.payload.message,
                flag: action.payload.flag
            }
        default:
            return state;
    }
};

export default postReducer;