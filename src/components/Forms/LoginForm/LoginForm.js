import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import api from '../../../lib/api';

class App extends Component {

	onChange = (value) => {
		const state = {...this.state};
		state[value.target.name] = value.target.value;
		this.setState(state);
	};

	onSubmit = async() => {
		try {
			const response = await api('POST', '/users/login', {
				username: this.state.username,
				password: this.state.password,
			});

			localStorage.setItem('token', response.data.token);
			this.props.onLogin(true);
		} catch(e) {
			console.error(e);
			this.props.onLogin(false);
		}
	};

	render() {
		return (
			<Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as='h2' color='teal' textAlign='center'>
						<Image src='/logo.png' /> Log-in to your account
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
					<Message>
						New to us? <a href='#'>Sign Up</a>
					</Message>
				</Grid.Column>
			</Grid>
		);
	}
}

export default App;
