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

const logged_out = (redirectHome) => {
	return {
		type: TYPE.LOG_OUT,
		isLogged: false,
		redirectHome: redirectHome || false,
	}
};

const logout = (redirectHome) => {
	return async (dispatch) => {
		localStorage.removeItem('token');
		dispatch(logged_out(redirectHome));
	}
};

const login = (token, user) => {
	return (dispatch) => {
		localStorage.setItem('token', token);
		dispatch(logged_in(user));
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