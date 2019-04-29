import React, {Component} from 'react';
import {Button, Dropdown, Icon} from "semantic-ui-react";
import withPeriod from "../../hoc/withPeriod";

class FilterPeriod extends Component {
	render() {
		const {from, period, all} = this.props;
		return (
			<div className="titles">
				<div className="controls">
					<Dropdown
						text={from.format('MMMM YYYY')}
						icon='filter'
						floating
						labeled
						button
						className='icon'
						color='teal'
						onChange={this.props.changePeriod}
						options={period}
						placeholder='Select date'
						selection
					/>
					<Button icon labelPosition='left' positive={all} onClick={this.props.handleAllButton}>
						All time
						<Icon name={`${all ? 'check ' : ''}square outline`} />
					</Button>
				</div>
			</div>
		);
	}
}

export default withPeriod(FilterPeriod);