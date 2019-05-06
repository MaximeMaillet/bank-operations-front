import {TYPE} from './actions'

const initialState = {
	credit: 0,
	debit:0,
	total:0,
	loading: false,
	loaded: false,
	reloaded: false,
};

export default (state = initialState, actions) => {
	switch(actions.type) {
		case TYPE.START_LOADING:
			return {
				...state,
				loading: actions.loading,
				reloaded: actions.reloaded,
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
				credit: 'N/A',
				debit: 'N/A',
				total: 'N/A',
			};
		case TYPE.LOADED:
			return {
				...state,
				credit: actions.data.credit,
				debit: actions.data.debit,
				total: actions.data.total,
				loaded: true,
			};
		case TYPE.RELOAD:
			return {
				...state,
				reloaded: actions.reloaded,
			};
		default:
				return state;
	}
}