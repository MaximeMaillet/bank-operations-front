import {TYPE} from "./actions";

const initialState = {
	from: null,
	to: null,
	all: 0,
	period: 0,
};

export default (state = initialState, actions) => {
	switch(actions.type) {
		case TYPE.CHANGE:
			return {
				...state,
				from: actions.from,
				to: actions.to,
				period: state.period+1,
				all: actions.all,
			};
		case TYPE.CHANGE_FOR_ALL:
			return {
				...state,
				from: actions.from,
				to: actions.to,
				period: state.period+1,
				all: actions.all,
			};
		default:
			return state;
	}
}
