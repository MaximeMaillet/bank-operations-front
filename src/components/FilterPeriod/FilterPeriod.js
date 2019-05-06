import React, {Component} from 'react';
import {Button, Dropdown, Icon} from "semantic-ui-react";
import withPeriod from "../../hoc/withPeriod";

import './filter-period.scss'

class FilterPeriod extends Component {

	changeFrom = (e, {value}) => {
		this.props.changePeriod(value, this.props.to);
	};

	changeTo = (e, {value}) => {
		this.props.changePeriod(this.props.from, value);
	};

	render() {
		const {from, to, periodFrom, periodTo, all} = this.props;
		return (
			<div className="filter-period">
				<div className="controls">
					<Dropdown
						text={`From ${from.format('MMMM YYYY')}`}
						icon='filter'
						floating
						labeled
						button
						className='icon'
						color='teal'
						onChange={this.changeFrom}
						options={periodFrom}
						placeholder='Select date'
						selection
						disabled={!!all}
					/>
					<Dropdown
						text={`to ${to.format('MMMM YYYY')}`}
						icon='filter'
						floating
						labeled
						button
						className='icon'
						color='teal'
						onChange={this.changeTo}
						options={periodTo}
						placeholder='Select date'
						selection
						disabled={!!all}
					/>
					<Button icon labelPosition='left' positive={!!all} onClick={this.props.handleAllTime}>
						All time
						<Icon name={`${!!all ? 'check ' : ''}square outline`} />
					</Button>
				</div>
			</div>
		);
	}
}

export default withPeriod(FilterPeriod);