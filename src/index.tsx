import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Check method getChannels on API Documentation!
// This will be a good place to call httpService.getChannels
// You can call ReactDOM in the then() method of a Promise
ReactDOM.render(<App appName="TCHIT-TCHAT"/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
