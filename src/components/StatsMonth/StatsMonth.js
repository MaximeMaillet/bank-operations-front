import React, {Component} from 'react';
import {Icon, Label, Statistic, Step, Dropdown} from "semantic-ui-react";
import api from '../../lib/api'
import moment from 'moment';

import './stats-month.scss'
import {connect} from "react-redux";
import actionCurrentPeriod from "../../redux/currentPeriod/actions";
import withStatistics from "../../hoc/withStatistics";
import shouldLogged from "../../hoc/shouldLogged";

class StatsMonth extends Component {
	changePeriod = (e, {value}) => {
		this.props.changePeriod(moment(value), moment(value).add(1, 'months'));
	};

	render() {
		const {from, period, credit, debit, total} = this.props;
		return (
			<div className="stats-month">
				<div className="titles">
					<Label color="blue" ribbon>{from.format('MMMM YYYY')}</Label>
					<div className="controls">
						<Dropdown
							text={from.format('MMMM YYYY')}
							icon='filter'
							floating
							labeled
							button
							className='icon'
							color='teal'
							onChange={this.changePeriod}
							options={period}
							placeholder='Select date'
							selection
						/>
					</div>
				</div>
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

export default connect(
	(state) => ({}),
	(dispatch) => ({
		changePeriod: (from, to) => dispatch(actionCurrentPeriod.changePeriod(from, to))
	})
)(shouldLogged(withStatistics(StatsMonth)));