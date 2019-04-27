import React from 'react';
import {connect} from "react-redux";
import actionsOperation from '../redux/operations/actions';
import {withRouter} from "react-router-dom";
import OperationsTableNoResults from "../components/Operations/OperationsTableNoResults/OperationsTableNoResults";
import {toast} from "react-semantic-toasts";

export default function shouldLogged(BaseComponent) {
	class OperationsComponent extends React.PureComponent {

		componentDidMount() {
			if(!this.props.loaded) {
				this.load(this.props.location);
			}
		}

		componentWillReceiveProps(nextProps, nextContext) {
			this.load(nextProps.location);
		}

		load = (location) =>{
			const searchParams = new URLSearchParams(location.search);
			this.props.loadOperations(this.props.token, {
				page: searchParams.get('page') || 1,
				offset: searchParams.get('offset') || 20,
			});
		};

		render() {
			if(this.props.loaded) {
				const { operations, pagination, error } = this.props;
				if(!error) {
					return <BaseComponent
						{...this.props}
						hasOperation={operations.length > 0}
						operations={operations}
						pagination={pagination}
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
			token: state.user.token,
			loaded: state.operations.loaded,
			operations: state.operations.operations,
			pagination: state.operations.pagination,
			error: state.operations.error,
		}),
		(dispatch) => ({
			loadOperations: (token, data) => dispatch(actionsOperation.load(token, data))
		})
	)(withRouter(OperationsComponent));
}