import {Dimmer, Loader} from "semantic-ui-react";
import React from "react";

export default class FormLoader extends React.Component {
	render() {
		return (
			<Dimmer active={this.props.active} inverted>
				<Loader size='large'>Loading</Loader>
			</Dimmer>
		);
	}
}