import React from 'react';
import {connect} from "react-redux";
import actionsStats from '../redux/statistics/actions';
import {withRouter} from "react-router-dom";
import OperationsTableNoResults from "../components/Operations/OperationsTableNoResults/OperationsTableNoResults";
import {toast} from "react-semantic-toasts";
import moment from 'moment';
import StatsMonthLoading from "../components/StatsMonth/StatsMonthLoading";

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
				if(nextProps.from !== this.props.from) {
					this.props.load(nextProps.from, nextProps.to);
				}

				if(!nextProps.loaded) {
					this.props.load(nextProps.from, nextProps.to);
				}

				if(nextProps.reload !== this.props.reload) {
					this.props.load(nextProps.from, nextProps.to);
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
			this.props.load(this.props.from, this.props.to);
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

			const {data: {credit, debit, total}, from} = this.props;

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
			data: state.statistics.data,
			error: state.statistics.error,
		}),
		(dispatch) => ({
			load: (from, to) => dispatch(actionsStats.loadStatistics(from, to)),
		})
	)(StatisticsComponent);
}