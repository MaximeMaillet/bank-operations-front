import React, {Component} from 'react';
import {Message} from "semantic-ui-react";

export default class MainErrors extends Component {
	render() {

		if(!this.props.valid) {
			return <Message negative>
				<Message.Header>Form error</Message.Header>
				<p>{this.props.error}</p>
			</Message>;
		}

		return null;
	}
}