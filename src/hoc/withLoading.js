import React from 'react';
import {connect} from "react-redux";

export default function withLoading(BaseComponent, LoadingComponent) {
	class OperationsComponent extends React.PureComponent {

		render() {
			if(this.props.loading) {
				return <LoadingComponent {...this.props} />;
			}

			return <BaseComponent {...this.props}/>;
		}
	}

	return connect(
		(state) => ({
			loading: state.operations.loading,
		})
	)(OperationsComponent);
}