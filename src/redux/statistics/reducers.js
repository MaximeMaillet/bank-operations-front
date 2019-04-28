import {TYPE} from './actions'

const initialState = {
	data: {
		credit: 0,
		debit:0,
		total:0,
	},
	loading: false,
	loaded: false,
};

export default (state = initialState, actions) => {
	switch(actions.type) {
		case TYPE.START_LOADING:
			return {
				...state,
				loading: actions.loading,
			};
		case TYPE.STOP_LOADING:
			return {
				...state,
				loading: actions.loading,
			};
		case TYPE.FAILED:
			return {
				...state,
				error: actions.error,
				loaded: true,
				data: {
					credit: 'N/A',
					debit: 'N/A',
					total: 'N/A',
				}
			};
		case TYPE.LOADED:
			return {
				...state,
				data: actions.data,
				loaded: true,
			};
		case TYPE.RELOAD:
			return {
				...state,
				loaded: false,
			}
	}
	return state;
}