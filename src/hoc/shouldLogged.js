import React from 'react';
import {connect} from "react-redux";
import UnauthorizedComponent from "../components/Errors/UnauthorizedComponent";
import jwt from "jwt-decode";
import actionsUser from "../redux/user/actions";

export default function shouldLogged(BaseComponent) {
	class LoggedComponent extends React.PureComponent {

		componentDidMount() {
			const token = localStorage.getItem('token');
			if(token) {
				const decoded = jwt(token);
				const dateNow = new Date();
				const dateExp = new Date(decoded.exp*1000);
				if(dateExp >= dateNow) {
					this.props.login(token, decoded.data);
				} else {
					this.props.logout();
				}
			} else {
				this.props.logout();
			}
		}

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
		}),
		(dispatch) => ({
			login: (token, user) => dispatch(actionsUser.login(token, user)),
			logout: () => dispatch(actionsUser.logout())
		})
	)(LoggedComponent);
}