import React, {Component} from 'react';
import {Input, Form, Segment} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import moment from 'moment';
import {Creatable} from 'react-select';

import './operation-form.scss';

class OperationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: props.operation,
      submit: false,
    };
  }

  onChange = (value) => {
    console.log(value);
    const state = {...this.state.values};
    state[value.target.name] = value.target.value;
    this.setState({values: state});
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.submit) {
      this.handleSubmit();
    }
  }

  handleSubmit = () => {
    const values = this.state.values;
    this.props.onSubmit(values);
  };

  render() {
    const {values} = this.state;
    const options = [
      {value: 1, label: 'Coucou'}
    ];

    return (
      <Form size='large' onSubmit={this.handleSubmit}>
        <Segment>
          <DatePicker
            selected={values && values.date ? values.date.toDate() : moment().toDate()}
            dateFormat="d/MM/YYYY"
            onChange={(value) => this.onChange({target: {name: 'date', value: moment(new Date(value))}})}
          />
          <Form.Input
            onChange={this.onChange}
            name="label_str"
            value={values && values.label_str ? values.label_str : ''}
            fluid
            placeholder='Label'
          />
          <Creatable
            value={values && values.tag ? values.tags.map((tag, index) => {
              return {value: index, label: tag}
            }) : []}
            onChange={(value) => this.onChange({target: {name: 'tags', value: value.map((val) => val.label)}})}
            isMulti
            options={options}
          />
          <Form.Group width="equal" unstackable with={2}>
            <Form.Field>
              <label htmlFor="credit">Credit</label>
              <Input
                onChange={this.onChange}
                name="credit"
                id="credit"
                value={values && values.credit ? values.credit : 0}
                placeholder='Credit'
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="debit">Debit</label>
              <Input
                onChange={this.onChange}
                id="debit"
                name="debit"
                value={values && values.debit ? values.debit : 0}
                placeholder='Debit'
              />
            </Form.Field>
          </Form.Group>
          <Form.Input
            onChange={this.onChange}
            name="category"
            value={values && values.category ? values.category : ''}
            fluid
            placeholder='Category'
          />
        </Segment>
      </Form>
    );
  }
}

export default OperationForm;