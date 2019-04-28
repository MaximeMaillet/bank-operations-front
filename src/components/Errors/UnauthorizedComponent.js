import React, { Component } from 'react';
import {Container, Responsive, Message} from 'semantic-ui-react'
import {Link} from "react-router-dom";

class UnauthorizedComponent extends Component {

	render() {
		return (
			<Responsive>
				<Container text>
					<Message
						error
						size="huge"
						header="Your are not authorized"
						content="You have no rights for access this content"
					/>
					<Link to="/">Back from home</Link>
				</Container>
			</Responsive>
		);
	}
}

export default UnauthorizedComponent;
