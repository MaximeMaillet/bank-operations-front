import React, {Component} from 'react';
import {Icon, Label, Statistic, Step, Dropdown, Button} from "semantic-ui-react";
import moment from 'moment';
import './stats-month.scss'
import {connect} from "react-redux";
import actionCurrentPeriod from "../../redux/currentPeriod/actions";
import withStatistics from "../../hoc/withStatistics";
import shouldLogged from "../../hoc/shouldLogged";
import queryString from "query-string";

class StatsMonth extends Component {
	constructor(props) {
		super(props);
		const params = queryString.parse(props.location.search);
		this.state = {
			allButtonChecked: (!params.from && !params.to) || (moment(params.from).diff(moment(props.user.firstOperationDate)) === 0 && moment(params.to).diff(moment(props.user.lastOperationDate)) === 0),
		};
	}

	changePeriod = (e, {value}) => {
		// this.props.changePeriod(moment(value), moment(value).add(1, 'months'));
		const {pathname, search} = this.props.location;
		const params = queryString.parse(search);
		params.from = moment(value).format('YYYY-MM-DD[T]HH:mm:ss');
		params.to = moment(value).add(1, 'months').startOf('month').format('YYYY-MM-DD[T]HH:mm:ss');
		this.props.history.push({
			pathname,
			search: queryString.stringify(params)
		})
	};

	handleAllButton = () => {
		this.setState({allButtonChecked: !this.state.allButtonChecked});
		const {pathname, search} = this.props.location;
		const params = queryString.parse(search);
		if(this.state.allButtonChecked) {
			params.from = moment().startOf('month').format('YYYY-MM-DD[T]HH:mm:ss');
			params.to = moment().add(1, 'months').startOf('month').format('YYYY-MM-DD[T]HH:mm:ss');
		} else {
			params.from = moment(this.props.user.firstOperationDate).format('YYYY-MM-DD[T]HH:mm:ss');
			params.to = moment(this.props.user.lastOperationDate).format('YYYY-MM-DD[T]HH:mm:ss');
		}

		this.props.history.push({
			pathname,
			search: queryString.stringify(params)
		})
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
						<Button icon labelPosition='left' positive={this.state.allButtonChecked} onClick={this.handleAllButton}>
							All time
							<Icon name={`${this.state.allButtonChecked ? 'check ' : ''}square outline`} />
						</Button>
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
	(state) => ({
		user: state.user.user,
	}),
	(dispatch) => ({
		changePeriod: (from, to) => dispatch(actionCurrentPeriod.changePeriod(from, to)),
	})
)(shouldLogged(withStatistics(StatsMonth)));