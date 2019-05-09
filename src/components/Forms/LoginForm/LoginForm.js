import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import {connect} from "react-redux";
import { Field, reduxForm } from 'redux-form'
import submit from './submit';
import FormComponent from '../../FormComponents/form'

class LoginForm extends Component {
	render() {
		return (
			<Form error={!!this.props.error} size='large' onSubmit={this.props.handleSubmit}>
				<FormComponent.MainErrors {...this.props} />
				<Segment>
					<Field
						name="username"
						component={FormComponent.Input}
						type="text"
						fluid
						icon='user'
						iconPosition='left'
						placeHolder='Username'
					/>
					<Field
						name="password"
						component={FormComponent.Input}
						type="password"
						fluid
						icon='lock'
						iconPosition='left'
						placeholder='Password'
					/>
					<Button color='teal' fluid size='large' type="submit">
						Login
					</Button>
				</Segment>
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
	form: 'loginForm',
	onSubmit: submit,
})(LoginForm));