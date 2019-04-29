import React, { Component } from 'react';
import { Container, Menu, Segment } from 'semantic-ui-react'
import {connect} from "react-redux";

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
						<Menu.Item active as='a' to="/dashboard">
							Dashboard
						</Menu.Item>
					</Container>
				</Menu>
			</Segment>
		);
	}
}

export default connect((state) => ({user: state.user.user}))(TopHeader);