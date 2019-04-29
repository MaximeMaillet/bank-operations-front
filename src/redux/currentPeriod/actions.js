export const TYPE = {
	CHANGE: 'currentPeriod::change',
	CHANGE_FOR_ALL: 'currentPeriod::change_for_all',
};

const changePeriod = (from, to) => {
	return {
		type: TYPE.CHANGE,
		from: from,
		to: to
	}
};

const changeForAll = (isForAll) => {
	return {
		type: TYPE.CHANGE_FOR_ALL,
		all: isForAll,
	}
};

export default {
	changePeriod,
	changeForAll,
}