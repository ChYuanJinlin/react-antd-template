import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import reducers from './store/reducers'
import './index.css';
import App from './App';

let store = createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))
ReactDOM.render((
    <App store={store} />
), document.getElementById('root'))
