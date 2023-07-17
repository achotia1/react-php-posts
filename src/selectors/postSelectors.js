// npm i reselect

import { createSelector } from 'reselect';

const getPosts = (state, props) => state.postReducer.posts;
const getId = (state, props) => props.match.params.id;

const postSelectors = {
    getPostById: createSelector(getPosts, getId, function (posts, id) {
        const post = posts.find(p => p.id === id);
        return post;
    })
};

export default postSelectors;