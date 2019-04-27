import api from "../../lib/api";
import moment from 'moment';

export const TYPE = {
	OPERATION_LOADED: 'Operation::operation_loaded',
	OPERATION_FAIL: 'Operation::operation_fail',
	OPERATION_ADDED: 'Operation::operation_added',
	START_LOADING: 'Operation::start_loading',
	STOP_LOADING: 'Operation::stop_loading',
};

const operationLoaded = (operations, pagination) => {
	return {
		type: TYPE.OPERATION_LOADED,
		operations,
		pagination,
	}
};

const startLoading = () => {
	return {
		type: TYPE.START_LOADING,
	}
};

const stopLoading = () => {
	return {
		type: TYPE.STOP_LOADING
	}
};

const operationFailed = (error) => {
	return {
		type: TYPE.OPERATION_FAIL,
		error,
	};
};

const added= (data) => {
	return {
		type: TYPE.OPERATION_ADDED,
		operation: data,
	}
};

const load = (token, data) => {
	return async (dispatch) => {
		try {
			dispatch(startLoading());
			const response = await api('GET', '/users/operations', data);

			const {operations, pagination: {page, lastPage, pageSize: offset}} = response.data;

			dispatch(operationLoaded(
				operations.map((ope) => {
					return {
						...ope,
						date: moment(ope.date),
					}
				}),
				{
					page, offset, lastPage,
				}
			));

		} catch(e) {
			dispatch(operationFailed(e.data));
		} finally {
			dispatch(stopLoading());
		}
	}
};

const add = (data) => {
	return async (dispatch) => {
		try {
			dispatch(startLoading());
			const response = await api('POST', '/users/operations', data);
			dispatch(added(response.data));
		} catch(e) {

		} finally {
			dispatch(stopLoading());
		}
	}
};

export default {
	load,
	add,
	added,
}