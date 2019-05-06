import React from 'react';
import {connect} from "react-redux";
import actionsOperation from '../redux/operations/actions';
import {withRouter} from "react-router-dom";
import OperationsTableNoResults from "../components/Operations/OperationsTableNoResults/OperationsTableNoResults";
import {toast} from "react-semantic-toasts";
import queryString from "query-string";
import OperationsTableLoading from "../components/Operations/OperationsTableLoading/OperationsTableLoading";

export default function withOperations(BaseComponent) {
	class OperationsComponent extends React.PureComponent {

		componentDidMount() {
			if(!this.props.loaded) {
				this.load(this.props.location);
			}
		}

		componentWillReceiveProps(nextProps, nextContext) {
			if(!nextProps.loading){
				if(this.props.period !== nextProps.period || nextProps.reloaded) {
					this.load(nextProps.location);
				}
			}
		}

		load = (location) => {
			const params = queryString.parse(location.search);
			this.props.loadOperations(params);
		};

		render() {
			if(this.props.loading || !this.props.loaded) {
				return <OperationsTableLoading />;
			}

			if(this.props.loaded) {
				const { operations, pagination, total, error } = this.props;
				if(!error) {
					return <BaseComponent
						{...this.props}
						hasOperation={operations.length > 0}
						hasPagination={!!pagination}
						operations={operations}
						pagination={pagination}
						total={total}
					/>;
				} else {
					toast({
						position: 'top-right',
						type: 'error',
						title: 'An error is occured',
						description: error.message,
						animation: 'bounce',
						time: 10000
					});
				}
			}

			return <OperationsTableNoResults {...this.props} />;
		}
	}

	return connect(
		(state) => ({
			reloaded: state.operations.reloaded,
			loaded: state.operations.loaded,
			loading: state.operations.loading,
			operations: state.operations.operations,
			pagination: state.operations.pagination,
			total: state.operations.total,
			error: state.operations.error,
			from: state.currentPeriod.from,
			to: state.currentPeriod.to,
			period: state.currentPeriod.period,
		}),
		(dispatch) => ({
			loadOperations: (data) => dispatch(actionsOperation.load(data)),
		})
	)(withRouter(OperationsComponent));
}