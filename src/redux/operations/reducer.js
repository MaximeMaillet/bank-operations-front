import {TYPE} from "./actions";

const initialState = {
	loading: false,
	loaded: false,
	operations: [],
	pagination: {},
	total: {credit:0, debit: 0},
	reloaded: false,
};

export default function(state = initialState, actions) {
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
				loaded: actions.loaded,
			};
		case TYPE.LOADED:
			return {
				...state,
				loaded: actions.loaded,
				operations: actions.operations,
				pagination: actions.pagination,
				total: actions.total,
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