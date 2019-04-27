import React, { Component } from 'react';
import LoginForm from "../../components/Forms/LoginForm/LoginForm";

class Home extends Component {
	onLoginSuccess = () => {
		this.props.history.push('/dashboard');
	};

	render() {
    return (
      <div className='login-form'>
	      <LoginForm
		      initialValues={{
		      	username: 'maxime',
			      password: 'maxime',
		      }}
		      onSubmitSuccess={this.onLoginSuccess}
	      />
      </div>
    );
  }
}

export default Home;
