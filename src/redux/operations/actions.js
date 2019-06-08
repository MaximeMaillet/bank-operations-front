import api from "../../lib/api";
import moment from 'moment';

export const TYPE = {
	START_LOADING: 'OperationReducer::start_loading',
	STOP_LOADING: 'OperationReducer::stop_loading',
	LOADED: 'OperationReducer::loaded',
	RELOAD: 'OperationReducer::reload',
	FAILED: 'OperationReducer::failed',
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

const loaded = (operations, total, pagination) => {
	return {
		type: TYPE.LOADED,
		operations,
		pagination,
		total,
		loaded: true,
	}
};

const failed = (error) => {
	return {
		type: TYPE.FAILED,
		error,
		loaded: true,
	};
};

const reloaded = () => {
	return {
		type: TYPE.RELOAD,
		reloaded: true,
	}
};

const load = (data) => {
	return async (dispatch) => {
		try {
			dispatch(startLoading());
			const response = await api('GET', '/users/operations', data);
			let {operations, pagination: {page, lastPage, pageSize: offset}} = response.data;

			const total = {credit:0, debit: 0};
			if(operations && operations.length > 0) {
				total.debit = Math.round(
					operations
						.map(item => !isNaN(item.debit) ? item.debit *-1: 0)
						.reduce((acc, current) => {
							if(!isNaN(current)) {
								return acc + current;
							}
							return acc;
						})
					* 100
				) / 100;

				total.credit = Math.round(
					operations
						.map(item => !isNaN(item.credit) ? item.credit : 0)
						.reduce((acc, current) => {
							if(!isNaN(current)) {
								return acc + current;
							}
							return acc;
						})
					* 100
				) / 100;
			}

			operations = operations.map((ope) => {
				return {
					...ope,
					date: moment(ope.date),
				}
			});

			dispatch(loaded(
				operations, total, {page, offset, lastPage}));
		} catch(e) {
			dispatch(failed(e));
		} finally {
			dispatch(stopLoading());
		}
	}
};

const reload = () => {
	return async (dispatch) => {
		dispatch(reloaded());
	}
};

const edit = (data) => {
	return async (dispatch) => {
		try {
			dispatch(startLoading())
		} catch(e) {

		}
	}
}

export default {
	load,
	reload,
	edit,
}
