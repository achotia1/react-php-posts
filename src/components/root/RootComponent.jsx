// ------------------------------------------------------ Using Custom History

import React from 'react';
import { Router } from 'react-router-dom';
import history from '../../utilities/history';

import NavigationComponent from '../bs-nav/NavigationComponent';
import ErrorHandler from '../common/ErrorHandler';


const RootComponent = () => {
    
    return (
        <div className='container'>
            <ErrorHandler>
                <Router history={history}>
                    <NavigationComponent />
                </Router>
            </ErrorHandler>
        </div>
    );
};

export default RootComponent;