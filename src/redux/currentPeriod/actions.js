export const TYPE = {
	CHANGE: 'currentPeriod::change'
};

const changePeriod = (from, to) => {
	console.log('ACTIONS : CHANGE PERIOD')
	console.log(from.toDate())
	console.log(to.toDate())
	return {
		type: TYPE.CHANGE,
		from: from,
		to: to
	}
};

export default {
	changePeriod,
}