import React, {Component} from 'react';
import {Icon, Statistic, Step} from "semantic-ui-react";
import api from '../../lib/api'

class StatsMonth extends Component {
	constructor(props) {
		super(props);
		this.state = {
			credit: 0.00,
			debit: 0.00
		}
	}
	componentDidMount() {
		this.load();
	}

	load = async() => {
		try {
			const response = await api('GET', '/users/statistics');
			this.setState({
				credit: response.data.credit,
				debit: response.data.debit,
			})
		} catch(e) {
			console.error(e);
		}
	};

	render() {
		return (
			<Step.Group widths={3}>
				<Step>
					<Icon name='money bill alternate outline' />
					<Step.Content>
						<Step.Title>Gains du mois</Step.Title>
						<Step.Description>
							<Statistic size='small'>
								<Statistic.Value>{this.state.credit} <Icon name='euro' size='small' /></Statistic.Value>
							</Statistic>
						</Step.Description>
					</Step.Content>
				</Step>
				<Step>
					<Icon name='credit card' />
					<Step.Content>
						<Step.Title>Dépenses du mois</Step.Title>
						<Step.Description>
							<Statistic size='small'>
								<Statistic.Value>{this.state.debit} <Icon name='euro' size='small' /></Statistic.Value>
							</Statistic>
						</Step.Description>
					</Step.Content>
				</Step>
				<Step>
					<Icon name='chart line' />
					<Step.Content>
						<Step.Title>État du mois</Step.Title>
						<Step.Description>
							<Statistic size='small' color={(this.state.credit + this.state.debit) >= 0 ? 'green' : 'red' }>
								<Statistic.Value>{this.state.credit + this.state.debit} <Icon name='euro' size='small' /></Statistic.Value>
							</Statistic>
						</Step.Description>
					</Step.Content>
				</Step>
			</Step.Group>
		);
	}
}

export default StatsMonth;