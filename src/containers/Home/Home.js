import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import {Redirect} from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      toDashboard: false,
    }
  }

  onChange = (value) => {
    const state = {...this.state};
    state[value.target.name] = value.target.value;
    this.setState(state);
  };

  onSubmit = async(value) => {
    const response = await fetch(`${process.env.REACT_APP_REST_API_LOCATION}/api/users/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    });
    const data = await response.json();
    localStorage.setItem('token', data.token);
    this.setState({toDashboard: true})
  };

  render() {
    if (this.state.toDashboard === true) {
      return <Redirect to='/dashboard' />
    }

    return (
      <div className='login-form'>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Log-in to your account
            </Header>
            <Form size='large' onSubmit={this.onSubmit}>
              <Segment stacked>
                <Form.Input
                  onChange={this.onChange}
                  name="username"
                  fluid icon='user'
                  iconPosition='left'
                  placeholder='Username'
                />
                <Form.Input
                  onChange={this.onChange}
                  name="password"
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                />

                <Button color='teal' fluid size='large'>
                  Login
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Home;
