import moment from 'moment';
import {TYPE} from "./actions";

const initialState = {
	from: moment().startOf('month'),
	to: moment().add(1, 'months').startOf('month'),
	all: false,
};

export default (state = initialState, actions) => {
	switch(actions.type) {
		case TYPE.CHANGE:
			return {
				...state,
				from: actions.from,
				to: actions.to,
			};
		case TYPE.CHANGE_FOR_ALL:
			return {
				...state,
				all: actions.all,
			};
		default:
			return state;
	}
}