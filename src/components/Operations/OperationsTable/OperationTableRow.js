import React, {Component} from 'react';
import {Label, Table} from "semantic-ui-react";
import EditOperationModal from "../../Modals/EditOperationModal/EditOperationModal";
import RemoveModal from "../../Modals/RemoveOperationModal/RemoveOperationModal";
import SplitOperationModal from "../../Modals/SplitOperationModal/SplitOperationModal";

export default class OperationTableRow extends Component {
	render() {
		const {operation, isFirstDayOfMonth, firstDayOfMonth} = this.props;
		const label = <Label color="blue" ribbon>{firstDayOfMonth.format('MMMM YYYY')}</Label>;
		return (
			<Table.Row>
				<Table.Cell>
					{isFirstDayOfMonth ? label : null}
					{operation.date.format('DD/MM/YYYY')}
				</Table.Cell>
				<Table.Cell>
					{operation.category}
				</Table.Cell>
				<Table.Cell>
					<div className="cut-too-long">{operation.label}</div>
					{operation.tags.map((tag, index) => {
						return (
							<Label key={index} as='span' color="teal">{tag}</Label>
						);
					})}
				</Table.Cell>
				<Table.Cell>{operation.credit}</Table.Cell>
				<Table.Cell>{operation.debit}</Table.Cell>
				<Table.Cell className="nowrap">
					<SplitOperationModal operation={operation} />
					<EditOperationModal operation={operation} />
					<RemoveModal operation={operation} />
				</Table.Cell>
			</Table.Row>
		);
	}
}
