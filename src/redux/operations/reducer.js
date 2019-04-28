import {TYPE} from "./actions";
import moment from 'moment';

const initialState = {
	isLoaded: false,
	loaded: false,
	operations: [],
	pagination: {},
	total: {credit:0, debit: 0},
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

			const total = {credit:0, debit: 0};
			if(actions.operations && actions.operations.length > 0) {
				total.debit = Math.round(
					actions.operations
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
					actions.operations
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

			return {
				...state,
				loaded: true,
				operations: actions.operations
				.map((ope) => {
					return {
						...ope,
						date: moment(ope.date),
					}
				}),
				pagination: actions.pagination,
				total,
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