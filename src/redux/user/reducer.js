import {TYPE} from './actions';

const initialState = {
	isLogged: false,
	user: null,
};

export default function(state = initialState, actions) {
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
		default:
			return state;
	}
}