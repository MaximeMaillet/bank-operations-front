import moment from 'moment';

export const TYPE = {
	CHANGE: 'currentPeriod::change'
};

const changePeriod = (from, to) => {
	return {
		type: TYPE.CHANGE,
		from: from,
		to: to
	}
};

export default {
	changePeriod,
}