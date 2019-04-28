import moment from 'moment';
import {TYPE} from "./actions";

const initialState = {
	from: moment().startOf('month').startOf('month'),
	to: moment().add(1, 'months').startOf('month'),
};

export default (state = initialState, actions) => {
	if(actions.type === TYPE.CHANGE) {
		return {
			...state,
			from: actions.from,
			to: actions.to,
		}
	}
	return state;
}