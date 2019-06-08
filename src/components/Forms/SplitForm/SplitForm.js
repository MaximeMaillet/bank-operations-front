import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import {connect} from "react-redux";
import {Field, FieldArray, reduxForm} from 'redux-form'
import api from "../../../lib/api";
import FormComponent from "../../FormComponents/form";
import submit from './submit'

export const formName = 'splitform';

const loadCategories = async(inputValue) => {
	return (await api('GET', '/users/categories', {}, {
		Authorization: `Bearer ${this.props.token}`
	})).data
		.filter(item => item.startsWith(inputValue))
		.map(item => ({label: item, value: item, key: item}));
};

const renderFields = ({ fields, meta: { error }, operation }) => {
	return (
	<div>
		<div className="split-actions">
			<Button type="button" className="flex-to-right" color="green" onClick={() => fields.push({date: operation.date.toDate(), tags: []})}>Add one split</Button>
		</div>
		<Grid columns={2} stackable>
		{fields.map((hobby, index) => (
			<Grid.Column key={index}>
				<Segment color="green" attached>
				<Form.Group style={{marginBottom: '1rem'}}>
					<Field
						name={`${hobby}.date`}
						component={FormComponent.Date}
						width={8}
						placeHolder='Date'
					/>
					<Field
						name={`${hobby}.label`}
						component={FormComponent.Input}
						type="text"
						width={8}
						fluid
						icon='pencil alternate'
						iconPosition='left'
						placeHolder='Label'
					/>
				</Form.Group>
				<Form.Group style={{marginBottom: '1em'}}>
					<Field
						name={`${hobby}.total`}
						component={FormComponent.Input}
						type="number"
						placeholder="Total"
						icon="euro"
						width={16}
					/>
				</Form.Group>
				<div>
					<Field
						name={`${hobby}.tags`}
						component={FormComponent.SelectCreatable}
						isMulti
						width={16}
						load={loadCategories}
					/>
				</div>
				</Segment>
				<Segment attached='bottom' raised style={{overflow: 'hidden'}}>
					<Button type="button" style={{float: 'right'}} color="red" onClick={() => fields.splice(index, 1)}>remove</Button>
				</Segment>
			</Grid.Column>
		))}
		</Grid>
		{error && <li className="error">{error}</li>}
	</div>
)};

class SplitForm extends Component {
	render() {
		return (
			<Form onSubmit={this.props.handleSubmit}>
				<FormComponent.MainErrors {...this.props} />
				<FieldArray
					name="subs"
					component={renderFields}
					operation={this.props.operation}
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
})(SplitForm));
