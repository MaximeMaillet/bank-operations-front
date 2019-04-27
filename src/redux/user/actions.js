import api from "../../lib/api";

const logged_fail = (error) => {
	return {
		type: TYPE.LOG_FAIL,
		isLogged: false,
		error,
	}
};

const logged_in = (user) => {
	return {
		type: TYPE.LOG_IN,
		isLogged: true,
		user,
	}
};

const logged_out = () => {
	return {
		type: TYPE.LOG_OUT,
		isLogged: false,
	}
};

const logout = () => {
	return async (dispatch) => {
		localStorage.removeItem('token');
		dispatch(logged_out());
	}
};

const login = (data) => {
	return (dispatch) => {
		localStorage.setItem('token', data.token);
		dispatch(logged_in(data.user));
	};
};

export const TYPE = {
	LOG_IN: 'UserReducer::login',
	LOG_OUT: 'UserReducer::logout',
	LOG_FAIL: 'UserReducer::log_fail'
};

export default {
	logout,
	login,
}