import api from "../../lib/api";

export const TYPE = {
	START_LOADING: 'StatisticsReducer::start_loading',
	STOP_LOADING: 'StatisticsReducer::stop_loading',
	LOADED: 'StatisticsReducer::loaded',
	RELOAD: 'StatisticsReducer::reload',
	FAILED: 'StatisticsReducer::failed',
};

const startLoading = () => {
	return {
		type: TYPE.START_LOADING,
		loading: true,
		reloaded: false,
	}
};

const stopLoading = () => {
	return {
		type: TYPE.STOP_LOADING,
		loading: false,
	}
};

const loaded = (data) => {
	return {
		type: TYPE.LOADED,
		data,
	}
};

const failed = (error) => {
	return {
		type: TYPE.FAILED,
		error,
	}
};

const reloaded = () => {
	return {
		type: TYPE.RELOAD,
		reloaded: true,
	}
};

const loadStatistics = (data) => {
	return async (dispatch) => {
		try {
			dispatch(startLoading());
			const response = await api('GET', '/users/statistics', data);
			dispatch(loaded(response.data));
		} catch(e) {
			dispatch(failed(e));
		} finally {
			dispatch(stopLoading())
		}
	}
};

const reload = () => {
	return async (dispatch) => {
		dispatch(reloaded());
	}
};

export default {
	loadStatistics,
	reload,
}