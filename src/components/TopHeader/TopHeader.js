import React, { Component } from 'react';
import { Container, Header, Icon, Label, Button, Table, Pagination, Menu, Segment, Responsive } from 'semantic-ui-react'
import {connect} from "react-redux";
import shouldLogged from "../../hoc/shouldLogged";

class TopHeader extends Component {

	render() {
		let fixed = false;

		return (
			<Segment
				inverted
				textAlign='center'
				className="top-header"
				vertical
				color="teal"
				style={{
					minHeight: 70,
					padding: '1em 0',
				}}
			>
				<Menu
					fixed={fixed ? 'top' : null}
					inverted={!fixed}
					pointing={!fixed}
					secondary={!fixed}
					size='large'
					style={{
						borderWidth: 0
					}}
				>
					<Container>
						<Menu.Item as='a' to="/dashboard">
							Dashboard
						</Menu.Item>
						<Menu.Item position='right'>
							<Button as='a' inverted={!fixed}>
								{this.props.user.username}
							</Button>
							<Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
								Sign Up
							</Button>
						</Menu.Item>
					</Container>
				</Menu>
			</Segment>
		);
	}
}

export default connect((state) => ({user: state.user.user}))(TopHeader);