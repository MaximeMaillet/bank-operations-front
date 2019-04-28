import React from 'react';
import {connect} from "react-redux";
import actionsStats from '../redux/statistics/actions';
import {withRouter} from "react-router-dom";
import {toast} from "react-semantic-toasts";
import moment from 'moment';
import StatsMonthLoading from "../components/StatsMonth/StatsMonthLoading";
import queryString from "query-string";

export default function withStatistics(BaseComponent) {
	class StatisticsComponent extends React.PureComponent {
		constructor(props) {
			super(props);
			this.periodOptions = this.generatePeriod(
				moment(props.user.firstOperationDate).startOf('month'),
				moment(props.user.lastOperationDate).startOf('month')
			);
		}

		componentWillReceiveProps(nextProps, nextContext) {
			if(!nextProps.loading) {
				const params = queryString.parse(nextProps.location.search);
				delete params.page;
				delete params.offset;
				if(!nextProps.loaded) {
					this.props.loadStatistics(params);
				}

				if(
					(params.from && moment(this.props.from).diff(moment(params.from)) !== 0 )||
					(params.to && moment(this.props.from).diff(moment(params.from)) !== 0)
				) {
					this.props.loadStatistics(params);
				}

				if(nextProps.error) {
					toast({
						position: 'top-right',
						type: 'error',
						title: 'An error was occured',
						description: nextProps.error.data.message,
						animation: 'bounce',
						time: 10000
					});
				}
			}
		}

		componentDidMount() {
			if(!this.props.loaded) {
				const params = queryString.parse(this.props.location.search);
				delete params.page;
				delete params.offset;
				this.props.loadStatistics(params);
			}
		}

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
			if(this.props.loading || !this.props.loaded) {
				return <StatsMonthLoading />;
			}

			const {credit, debit, total, from} = this.props;
			return <BaseComponent
				{...this.props}
				from={from}
				period={this.periodOptions}
				credit={credit}
				debit={debit}
				total={total}
			/>;
		}
	}

	return connect(
		(state) => ({
			user: state.user.user,
			from: state.currentPeriod.from,
			to: state.currentPeriod.to,
			loading: state.statistics.loading,
			loaded: state.statistics.loaded,
			credit: state.statistics.credit,
			debit: state.statistics.debit,
			total: state.statistics.total,
			error: state.statistics.error,
		}),
		(dispatch) => ({
			loadStatistics: (data) => dispatch(actionsStats.loadStatistics(data)),
		})
	)(withRouter(StatisticsComponent));
}