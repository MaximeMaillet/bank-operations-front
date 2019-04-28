import React, {Component} from 'react';
import {Form, Segment} from "semantic-ui-react";
import {connect} from "react-redux";

import './operation-form.scss';
import submit from "../OperationForm/submit";
import {Field, reduxForm} from "redux-form";
import FormComponent from "../../FormComponents/form";
import api from "../../../lib/api";

export const formName = 'operationForm';

class OperationForm extends Component {

  loadCategories = async(inputValue) => {
    return (await api('GET', '/users/categories', {}, {
      Authorization: `Bearer ${this.props.token}`
    })).data
      .filter(item => item.startsWith(inputValue))
      .map(item => ({label: item, value: item, key: item}));
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit} className="custom-form">
        <FormComponent.MainErrors {...this.props} />
        <Segment>
          <Form.Group unstackable>
            <Field
              name="date"
              component={FormComponent.Date}
              width={5}
              placeHolder='Date'
            />
            <Field
              name="label"
              component={FormComponent.Input}
              type="text"
              width={11}
              fluid
              icon='pencil alternate'
              iconPosition='left'
              placeHolder='Label'
            />
          </Form.Group>
          <div style={{
            marginBottom: '1rem'
          }}>
            <Field
              name="tags"
              component={FormComponent.SelectCreatable}
              isMulti
            />
          </div>
          <Form.Group>
            <Field
              name="credit"
              component={FormComponent.Input}
              type="number"
              placeholder="Crédit"
              icon="euro"
              width={8}
            />
            <Field
              name="debit"
              component={FormComponent.Input}
              type="number"
              placeholder="Débit"
              icon="euro"
              width={8}
            />
          </Form.Group>
          <div style={{
            marginBottom: '1rem'
          }}>
            <Field
              name="category"
              component={FormComponent.SelectCreatable}
              load={this.loadCategories}
              formatChange={(value) => value.value}
            />
          </div>
        </Segment>
      </Form>
    );
  }
}

export default connect(
  (state) => ({
    token: state.user.token,
  }))
(reduxForm({
  form: formName,
  onSubmit: submit,
})(OperationForm));