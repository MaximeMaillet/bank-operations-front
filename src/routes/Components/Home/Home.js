import React, { Component } from 'react';
import LoginForm from "../../../components/Forms/LoginForm/LoginForm";
import {Grid, Header, Image} from "semantic-ui-react";
import logo from "../../../medias/logo.svg";

class Home extends Component {
	onLoginSuccess = () => {
		this.props.history.push('/dashboard');
	};

	render() {
    return (
	    <Grid centered verticalAlign='middle' style={{minHeight: '100%'}}>
		    <Grid.Column mobile={12} tablet={8} computer={4} textAlign="center">
			    <Image centered src={logo} size="small"/>
			    <Header as='h1' color='teal' textAlign='center'>
				    Bank Operations
			    </Header>
			    <LoginForm
				    onSubmitSuccess={this.onLoginSuccess}
			    />
		    </Grid.Column>
	    </Grid>
    );
  }
}

export default Home;
