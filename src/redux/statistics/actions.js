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

const reload= () => {
	return {
		type: TYPE.RELOAD,
	}
};

const loadStatistics = (from, to) => {
	return async (dispatch) => {
		try {
			dispatch(startLoading());

			const response = await api('GET', '/users/statistics', {
				from: from.format('YYYY-MM-DD[T]HH:mm:ss'),
				to: to.format('YYYY-MM-DD[T]HH:mm:ss')
			});

			dispatch(loaded(response.data));
		} catch(e) {
			dispatch(failed(e));
		} finally {
			dispatch(stopLoading())
		}
	}
};

export default {
	loadStatistics,
	reload,
}