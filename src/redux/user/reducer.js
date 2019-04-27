import {TYPE} from './actions';
import jwt from "jwt-decode";

const initialState = {
	isLogged: false,
	user: null,
};

export default function(state = initialState, actions) {
	const token = localStorage.getItem('token');
	if(token) {
		state.token = token;
		const decoded = jwt(token);
		const dateNow = new Date();
		const dateExp = new Date(decoded.exp*1000);
		if(dateExp >= dateNow) {
			state.isLogged = true;
			state.user = decoded.data;
		}
	}

	switch(actions.type) {
		case TYPE.LOG_IN:
			return {
				...state,
				user: actions.user,
				isLogged: actions.isLogged
			};
		case TYPE.LOG_OUT:
			return {
				...state,
				isLogged: actions.isLogged,
			};
	}

	return state;
}