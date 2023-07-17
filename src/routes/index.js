import React, { lazy, Suspense } from 'react';
import { Switch, Route, Link, Redirect } from "react-router-dom";

import authenticatorClient from "../services/authenticator-api-client";

// Eager Loading
import HomeComponent from "../components/home/HomeComponent";
import LoaderAnimation from '../components/common/LoaderAnimation';

const PostsContainer = lazy(() => import('../containers/posts/PostsContainer'));
const ManagePostContainer = lazy(() => import('../containers/posts/ManagePostContainer'));
const AdminComponent = lazy(() => import('../components/admin/AdminComponent'));
const LoginComponent = lazy(() => import('../components/login/LoginComponent'));

const img404 = require('../assets/http-404.jpg');

const SecuredRoute = ({ component: Component, ...args }) => {
    return (
        <Route {...args} render={
            (props) => authenticatorClient.isAuthenticated === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        } />
    );
};

export default (
    <Suspense fallback={<LoaderAnimation />}>
        <Switch>
            <Route exact path="/" component={HomeComponent} />
            <SecuredRoute path="/admin/posts" component={PostsContainer} />
            <SecuredRoute path="/admin/post/:id" component={ManagePostContainer} />
            <SecuredRoute path="/admin/post" component={ManagePostContainer} />
            <SecuredRoute path="/admin" component={AdminComponent} />
            <Route path="/login" component={LoginComponent} />

              <Route path="**" render={
                () => (
                    <div className="text-center">
                        <article>
                            <h1 className="text-danger">No Route Configured!</h1>
                            <h4 className="text-danger">Please check your Route Configuration</h4>
                            <div className="mt-5">
                                <img src={img404} alt="Not Found" className="rounded" />
                            </div>
                            <h2 className="mt-5">
                                <Link exact className="nav-link" to="/">Back to Home</Link>
                            </h2>
                        </article>
                    </div>
                )
            } />
        </Switch>
    </Suspense>
);