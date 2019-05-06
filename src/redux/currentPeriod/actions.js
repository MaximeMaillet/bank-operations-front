import moment from "moment";

export const TYPE = {
	CHANGE: 'currentPeriod::change',
	CHANGE_FOR_ALL: 'currentPeriod::change_for_all',
};

const changePeriod = (from, to) => {
	return {
		type: TYPE.CHANGE,
		from: moment(from),
		to: moment(to),
		all: 0,
	}
};

const changeForAll = (from, to) => {
	return {
		type: TYPE.CHANGE_FOR_ALL,
		from: moment(from),
		to: moment(to),
		all: 1,
	}
};

const changeForNothing = () => {
	return {
		type: TYPE.CHANGE_FOR_ALL,
		all: 0,
	}
};

export default {
	changePeriod,
	changeForAll,
	changeForNothing,
}