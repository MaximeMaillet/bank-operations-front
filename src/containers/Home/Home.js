import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import {Redirect} from "react-router-dom";
import LoginForm from "../../components/Forms/LoginForm/LoginForm";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      toDashboard: false,
    }
  }

	onLogin = (data) => {
  	if(data) {
  		this.setState({toDashboard: true});
	  }
	};

  render() {
    if (this.state.toDashboard === true) {
      return <Redirect to='/dashboard' />
    }

    return (
      <div className='login-form'>
	      <LoginForm
		      onLogin={this.onLogin}
	      />
      </div>
    );
  }
}

export default Home;
