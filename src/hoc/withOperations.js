import React from 'react';
import {connect} from "react-redux";
import actionsOperation from '../redux/operations/actions';
import {withRouter} from "react-router-dom";
import OperationsTableNoResults from "../components/Operations/OperationsTableNoResults/OperationsTableNoResults";
import {toast} from "react-semantic-toasts";

export default function withOperations(BaseComponent) {
	class OperationsComponent extends React.PureComponent {

		componentDidMount() {
			if(!this.props.loaded) {
				this.load(this.props.location);
			}
		}

		componentWillReceiveProps(nextProps, nextContext) {
			if(nextProps.from !== this.props.from) {
				this.loadWithDate(nextProps.from.format('YYYY-MM-DD[T]HH:mm:ss'), nextProps.to.format('YYYY-MM-DD[T]HH:mm:ss'));
			} else {
				this.load(nextProps.location);
			}
		}

		loadWithDate = (from, to) => {
			this.props.loadWithDate({from, to});
		};

		load = (location) =>{
			const searchParams = new URLSearchParams(location.search);
			this.props.loadOperations({
				page: searchParams.get('page') || 1,
				offset: searchParams.get('offset') || 20,
			});
		};

		render() {
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
			reload: state.operations.reload,
			loaded: state.operations.loaded,
			operations: state.operations.operations,
			pagination: state.operations.pagination,
			total: state.operations.total,
			error: state.operations.error,
			from: state.currentPeriod.from,
			to: state.currentPeriod.to,
		}),
		(dispatch) => ({
			loadOperations: (data) => dispatch(actionsOperation.load(data)),
			loadWithDate: (data) => dispatch(actionsOperation.loadWithDate(data))
		})
	)(withRouter(OperationsComponent));
}