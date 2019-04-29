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

				if(this.props.all !== nextProps.all) {
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

		render() {
			if(this.props.loading || !this.props.loaded) {
				return <StatsMonthLoading />;
			}

			const {credit, debit, total, from} = this.props;
			return <BaseComponent
				{...this.props}
				from={from}
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
			all: state.currentPeriod.all,
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