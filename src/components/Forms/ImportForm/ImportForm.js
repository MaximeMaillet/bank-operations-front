import React, { Component } from 'react';
import {Form} from 'semantic-ui-react'
import {connect} from "react-redux";
import { Field, reduxForm } from 'redux-form'
import submit from './submit';
import FormComponent from '../../FormComponents/form'
import validate from './validate';

export const formName = 'ImportForm';

class ImportForm extends Component {

	render() {
		return (
			<Form error={!!this.props.error} size='large' onSubmit={this.props.handleSubmit}>
				<FormComponent.MainErrors {...this.props} />
				<Field
					name="file"
					component={FormComponent.Import}
					icon="file alternate"
				/>
			</Form>
		);
	}
}

export default connect(
	(state) => ({
		isLogged: state.user.isLogged,
		user: state.user.user,
		errors: state.user.errors,
	})
)(reduxForm({
	form: formName,
	onSubmit: submit,
	validate,
})(ImportForm));