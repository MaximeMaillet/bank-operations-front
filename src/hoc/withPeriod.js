import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import moment from 'moment';
import queryString from "query-string";
import actionsPeriod from "../redux/currentPeriod/actions";
import clone from 'lodash.clone'

export default function withPeriod(BaseComponent) {
	class PeriodComponent extends React.PureComponent {
		constructor(props) {
			super(props);
			[this.periodFrom, this.periodTo] = this.generatePeriod(
				moment(props.user.firstOperationDate).startOf('month'),
				moment(props.user.lastOperationDate).startOf('month')
			);
		}

		changePeriod = (from, to) => {
			if(!to) {
				to = moment(from).add(1, 'months');
			}
			const {pathname, search} = this.props.location;
			const params = queryString.parse(search);
			params.from = moment(from).startOf('month').format('YYYY-MM-DD[T]HH:mm:ss');
			params.to = moment(to).startOf('month').format('YYYY-MM-DD[T]HH:mm:ss');
			this.props.history.push({
				pathname,
				search: queryString.stringify(params)
			})
		};

		handleAllTime = () => {
			const {pathname, search} = this.props.location;
			const params = queryString.parse(search);
			if(!this.props.all) {
				delete params.from;
				delete params.to;
				params.all = 1;
			} else {
				delete params.all;
			}

			this.props.history.push({
				pathname,
				search: queryString.stringify(params)
			})
		};

		generatePeriod = (from, to) => {
			const period = [];
			let currentDate = moment(to).add(1, 'months'), nbMonth = 0;
			while(currentDate >= from) {
				nbMonth++;
				period.push({
					key: nbMonth,
					value: currentDate.startOf('month').startOf('day').format('YYYY-MM-DD[T]HH:mm:ss'),
					text: currentDate.startOf('month').startOf('day').format('MMMM YYYY'),
				});
				currentDate.subtract(1, 'months');
			}

			const arrayFrom = clone(period);
			const arrayTo = clone(period);
			arrayFrom.splice(0,1);
			return [arrayFrom, arrayTo];
		};

		render() {
			const {from, to, all, ...rest} = this.props;
			return <BaseComponent
				{...rest}
				from={from}
				to={to}
				all={all}
				periodFrom={this.periodFrom}
				periodTo={this.periodTo}
				changePeriod={this.changePeriod}
				handleAllTime={this.handleAllTime}
			/>;
		}
	}

	return connect(
		(state) => ({
			user: state.user.user,
			from: state.currentPeriod.from,
			to: state.currentPeriod.to,
			all: state.currentPeriod.all,
		}),
		(dispatch) => ({
			changeForAll: () => dispatch(actionsPeriod.changeForAll()),
			changePeriod: (from, to) => dispatch(actionsPeriod.changePeriod(from, to)),
		})
	)(withRouter(PeriodComponent));
}