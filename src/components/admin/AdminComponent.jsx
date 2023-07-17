import React, { lazy, Component } from 'react';
const PostsContainer = lazy(() => import('../../containers/posts/PostsContainer'));

class AdminComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { posts: [], message: "" };
    }

    render() {
        return (
            <div>
                <h4 className="text-success">Welcome Admin, you are an authenticated user.</h4>
                <hr />
                <h3 className="text-danger">{this.state.message}</h3>
                <PostsContainer />

            </div>
        );
    }


}

export default AdminComponent;