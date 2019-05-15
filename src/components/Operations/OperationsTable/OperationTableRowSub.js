import React, {Component} from 'react';
import {Label, Table} from "semantic-ui-react";
import EditOperationModal from "../../Modals/EditOperationModal/EditOperationModal";
import RemoveModal from "../../Modals/RemoveOperationModal/RemoveOperationModal";
import SplitOperationModal from "../../Modals/SplitOperationModal/SplitOperationModal";
import moment from "moment";
import clone from 'lodash.clone'

export default class OperationTableRowSub extends Component {
	render() {
		const {operation, firstDayOfMonth} = this.props;
		let isLabel = false;
		let _firstDayOfMonth = clone(firstDayOfMonth);
		if(moment(operation.date).startOf('month') < firstDayOfMonth) {
			_firstDayOfMonth = operation.date.startOf('month');
			isLabel = true;
		}

		const label = <Label color="blue" ribbon>{_firstDayOfMonth.format('MMMM YYYY')}</Label>;
		return (
			<Table.Row>
				<Table.Cell>
					{isLabel ? label : null}
					{operation.date.format('DD/MM/YYYY')}
				</Table.Cell>
				<Table.Cell>
					{operation.category}
				</Table.Cell>
				<Table.Cell>
					<Table>
						<Table.Body>
						{operation.subs.map((sub, index) => (
							<Table.Row key={index}>
								<Table.Cell>
									{moment(sub.date).format('DD/MM/YYYY')}
								</Table.Cell>
								<Table.Cell>
									<div className="cut-too-long">{sub.label}</div>
									{sub.tags.map((tag, index) => {
										return (
											<Label key={index} as='span' color="teal">{tag.value}</Label>
										);
									})}
								</Table.Cell>
								<Table.Cell>{sub.total}</Table.Cell>
							</Table.Row>
						))}
						</Table.Body>
					</Table>
				</Table.Cell>
				<Table.Cell>{operation.credit}</Table.Cell>
				<Table.Cell>{operation.debit}</Table.Cell>
				<Table.Cell className="nowrap">
					<SplitOperationModal operation={operation} />
					<RemoveModal operation={operation} />
				</Table.Cell>
			</Table.Row>
		);
	}
}
