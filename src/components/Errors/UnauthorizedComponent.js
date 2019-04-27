import React, { Component } from 'react';
import {Button, Container, Form, Grid, Header, Icon, Responsive, Segment, Message} from 'semantic-ui-react'
import TopHeader from "../TopHeader/TopHeader";
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
