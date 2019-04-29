import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import moment from 'moment';
import queryString from "query-string";
import actionsPeriod from "../redux/currentPeriod/actions";

export default function withPeriod(BaseComponent) {
	class PeriodComponent extends React.PureComponent {
		constructor(props) {
			super(props);
			const params = queryString.parse(props.location.search);
			props.changeForAll(!!params.all);
			this.period = this.generatePeriod(
				moment(props.user.firstOperationDate).startOf('month'),
				moment(props.user.lastOperationDate).startOf('month')
			);
		}

		componentWillReceiveProps(nextProps, nextContext) {
			const params = queryString.parse(nextProps.location.search);
			if(params.all !== this.props.all) {
				this.props.changeForAll(!!params.all);
			}
		}

		changePeriod = (e, {value}) => {
			const {pathname, search} = this.props.location;
			const params = queryString.parse(search);
			params.from = moment(value).format('YYYY-MM-DD[T]HH:mm:ss');
			params.to = moment(value).add(1, 'months').startOf('month').format('YYYY-MM-DD[T]HH:mm:ss');
			this.props.history.push({
				pathname,
				search: queryString.stringify(params)
			})
		};

		handleAllButton = () => {
			const {pathname, search} = this.props.location;
			const params = queryString.parse(search);
			if(!this.props.all) {
				delete params.from;
				delete params.to;
				params.all = true;
			} else {
				params.from = moment(this.props.user.firstOperationDate).startOf('month').format('YYYY-MM-DD[T]HH:mm:ss');
				params.to = moment(this.props.user.lastOperationDate).add(1, 'months').startOf('month').format('YYYY-MM-DD[T]HH:mm:ss');
				delete params.all;
			}

			this.props.history.push({
				pathname,
				search: queryString.stringify(params)
			})
		};

		generatePeriod = (from, to) => {
			const period = [];
			let currentDate = moment(to), nbMonth = 0;
			while(currentDate >= from) {
				nbMonth++;
				period.push({
					key: nbMonth,
					value: currentDate.startOf('month').startOf('day').format('YYYY-MM-DD[T]HH:mm:ss'),
					text: currentDate.startOf('month').startOf('day').format('MMMM YYYY'),
				});
				currentDate.subtract(1, 'months');
			}

			return period;
		};

		render() {
			const {from, all} = this.props;
			return <BaseComponent
				{...this.props}
				from={from}
				all={all}
				period={this.period}
				changePeriod={this.changePeriod}
				handleAllButton={this.handleAllButton}
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
			changeForAll: (data) => dispatch(actionsPeriod.changeForAll(data)),
		})
	)(withRouter(PeriodComponent));
}