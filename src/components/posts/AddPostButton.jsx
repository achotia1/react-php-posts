import React from 'react';
import { withRouter } from 'react-router-dom';

const AddPostButton = ({history}) => {
    return (
        <button className='btn btn-primary' onClick={
            (e) => {
                history.push('/admin/post');
            }
        }>
            Add Post
        </button>
    );
};

export default  withRouter(AddPostButton);