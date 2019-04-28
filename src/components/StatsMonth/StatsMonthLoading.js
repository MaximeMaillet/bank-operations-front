import React, {Component} from 'react';
import {Label, Step, Dropdown, Placeholder} from "semantic-ui-react";

import './stats-month.scss'

export default class StatsMonthLoading extends Component {
	render() {
		return (
			<div className="stats-month">
				<div className="titles">
					<Label color="blue" ribbon />
					<div className="controls">
						<Dropdown
							text='Date'
							icon='filter'
							floating
							labeled
							button
							className='icon'
							color='teal'
							options={[]}
							placeholder='Select date'
							selection
						/>
					</div>
				</div>
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
			</div>
		);
	}
}