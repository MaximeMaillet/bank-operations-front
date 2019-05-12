import React, { Component } from 'react';
import {Button, Container, Menu, Segment} from 'semantic-ui-react'
import {connect} from "react-redux";
import actionsUser from "../../redux/user/actions";

class TopHeader extends Component {
	render() {
		return (
			<Segment
				inverted
				textAlign='center'
				className="top-header"
				vertical
				color="teal"
			>
				<Menu
					inverted
					pointing
					secondary
					size='large'
					style={{
						borderWidth: 0
					}}
				>
					<Container>
						<Menu.Item active as='a' to="/dashboard">
							Dashboard
						</Menu.Item>
						<Menu.Menu position='right'>
							<Menu.Item>
								<Button primary onClick={() => this.props.logout(true)}>Log Out</Button>
							</Menu.Item>
						</Menu.Menu>
					</Container>
				</Menu>
			</Segment>
		);
	}
}

export default connect(
	(state) => ({
		user: state.user.user
	}),
	(dispatch) => ({
		logout: (redirectHome) => dispatch(actionsUser.logout(redirectHome))
	})
)
(TopHeader);