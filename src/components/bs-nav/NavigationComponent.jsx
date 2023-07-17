import React from 'react';
import { NavLink, useHistory   } from 'react-router-dom';
import authenticatorClient from '../../services/authenticator-api-client';

import SwitchComponent from '../../routes';

import './NavigationComponent.css';

var logo = require('../../assets/redux.svg');

const NavigationComponent = () => {
    const history = useHistory();
    
    return (
        <>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
                <div className="container-fluid">
                    <NavLink className="navbar-brand d-flex flex-column align-items-center" to="/">
                        <img src={logo} alt="React" width="70" height="28" className="d-inline-block align-text-top" />
                        Demo Post
                    </NavLink>

                    <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#myNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item px-3">
                                <NavLink exact className="nav-link d-flex flex-column align-items-center" to="/">
                                    <i className="bi bi-house-fill"></i>
                                    <span>Home</span>
                                </NavLink>
                            </li>
                            
                            <li className="nav-item px-3">
                                <NavLink className="nav-link d-flex flex-column align-items-center" to="/admin">
                                    <i className="bi bi-shield-lock-fill"></i>
                                    <span>Admin</span>
                                </NavLink>
                            </li>
                            
                            <li className="nav-item px-3" id='loginButton'>
                                <NavLink className="nav-link d-flex flex-column align-items-center" to="/login">
                                    <i className="bi bi-box"></i>
                                    <span>Login</span>
                                </NavLink>
                            </li>

                            <li className="nav-item px-3" id='logoutButton' style={{display : 'none'}}>
                                <NavLink className="nav-link logout d-flex flex-column align-items-center" 
                                to="/logout" onClick={
                                    e => {
                                        e.preventDefault();
                                        authenticatorClient.logout();
                                        document.getElementById('logoutButton').style.display = 'none'
                                        document.getElementById('loginButton').style.display = '';
                                        history.push('/login')
                                    }
                                }>
                                    <i className="bi bi-person-square"></i>
                                    <span>Logout</span>
                                </NavLink>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="card border-0 shadow my-5">
                <div className="card-body">
                    {SwitchComponent}
                </div>
            </div>
        </>
    );
};

export default NavigationComponent;