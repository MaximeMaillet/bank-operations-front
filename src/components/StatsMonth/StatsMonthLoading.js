import React, {Component} from 'react';
import {Step, Placeholder} from "semantic-ui-react";

export default class StatsMonthLoading extends Component {
	render() {
		return (
			<Step.Group widths={3}>
				<Step>
					<Placeholder style={{width: '100px'}}>
						<Placeholder.Header image>
							<Placeholder.Line />
							<Placeholder.Line />
						</Placeholder.Header>
					</Placeholder>
				</Step>
				<Step>
					<Placeholder style={{width: '100px'}}>
						<Placeholder.Header image>
							<Placeholder.Line />
							<Placeholder.Line />
						</Placeholder.Header>
					</Placeholder>
				</Step>
				<Step>
					<Placeholder style={{width: '100px'}}>
						<Placeholder.Header image>
							<Placeholder.Line />
							<Placeholder.Line />
						</Placeholder.Header>
					</Placeholder>
				</Step>
			</Step.Group>
		);
	}
}