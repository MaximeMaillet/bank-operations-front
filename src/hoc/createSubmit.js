import React from 'react';
import {connect} from "react-redux";
import { submit } from 'redux-form'

export default (formName, BaseComponent) => {
	class SubmitComponent extends React.PureComponent {

		onClick = (evt) => {
			this.props.dispatch(submit(formName));
			evt.preventDefault();
		};

		render() {
			return React.cloneElement(BaseComponent, { onClick: (e) => this.onClick(e)})
		}
	}

	return connect(
		(state) => ({
			form: state.form[formName]
		})
	)(SubmitComponent);
}