import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';
import 'bootstrap';
import RootComponent from './components/root/RootComponent';
import configureStore from './store/configureStore';

const appStore = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <RootComponent />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();