import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import reducers from './redux/reducers';
import thunkMiddleware from 'redux-thunk';

let store = createStore(
	combineReducers({
		...reducers
	}),
	{},
	compose(applyMiddleware(
		thunkMiddleware
	))
);

ReactDOM.render((
	<Provider store={store} >
    <App />
	</Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
