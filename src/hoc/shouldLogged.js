import React from 'react';
import {connect} from "react-redux";
import UnauthorizedComponent from "../components/Errors/UnauthorizedComponent";

export default function shouldLogged(BaseComponent) {
	class LoggedComponent extends React.PureComponent {
		render() {
			if(this.props.isLogged) {
				return <BaseComponent {...this.props} />;
			}

			return <UnauthorizedComponent />;
		}
	}

	return connect(
		(state) => ({
			isLogged: state.user.isLogged,
		})
	)(LoggedComponent);
}