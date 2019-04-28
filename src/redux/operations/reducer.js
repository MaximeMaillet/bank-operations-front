import {TYPE} from "./actions";

const initialState = {
	isLoaded: false,
	loaded: false,
	operations: [],
	pagination: {},
	reload: 0,
};

export default function(state = initialState, actions) {
	switch(actions.type) {
		case TYPE.START_LOADING:
			return {
				...state,
				loading: true,
				loaded: false,
			};
		case TYPE.STOP_LOADING:
			return {
				...state,
				loading: false,
			};
		case TYPE.OPERATION_LOADED:
			return {
				...state,
				loaded: true,
				operations: actions.operations,
				pagination: actions.pagination,
			};
		case TYPE.OPERATION_FAIL:
			return {
				...state,
				error: actions.error,
				loaded: true,
			};
		case TYPE.OPERATION_ADDED:
			return {
				...state,
				operation: actions.operation,
			};
		case TYPE.OPERATION_RELOAD:
			return {
				...state,
				reload: state.reload + 1,
			}
	}
	return state;
}