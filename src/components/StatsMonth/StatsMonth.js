import React, {Component} from 'react';
import {Icon, Statistic, Step} from "semantic-ui-react";
import './stats-month.scss'
import withStatistics from "../../hoc/withStatistics";
import shouldLogged from "../../hoc/shouldLogged";
import {withRouter} from "react-router-dom";
import FilterPeriod from "../FilterPeriod/FilterPeriod";

class StatsMonth extends Component {
	render() {
		const {credit, debit, total} = this.props;
		return (
			<div className="stats-month">
				<FilterPeriod />
				<Step.Group widths={3}>
					<Step>
						<Icon name='money bill alternate outline' />
						<Step.Content>
							<Step.Title>Gains</Step.Title>
							<Step.Description>
								<Statistic size='small'>
									<Statistic.Value>{credit} <Icon name='euro' size='small' /></Statistic.Value>
								</Statistic>
							</Step.Description>
						</Step.Content>
					</Step>
					<Step>
						<Icon name='credit card' />
						<Step.Content>
							<Step.Title>Dépenses</Step.Title>
							<Step.Description>
								<Statistic size='small'>
									<Statistic.Value>{debit} <Icon name='euro' size='small' /></Statistic.Value>
								</Statistic>
							</Step.Description>
						</Step.Content>
					</Step>
					<Step>
						<Icon name='chart line' />
						<Step.Content>
							<Step.Title>État</Step.Title>
							<Step.Description>
								<Statistic size='small' color={isNaN(total) ? 'black' : total >= 0 ? 'green' : 'red' }>
									<Statistic.Value>{total} <Icon name='euro' size='small' /></Statistic.Value>
								</Statistic>
							</Step.Description>
						</Step.Content>
					</Step>
				</Step.Group>
			</div>
		);
	}
}

export default shouldLogged(withStatistics(withRouter(StatsMonth)));