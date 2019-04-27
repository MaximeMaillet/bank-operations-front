import React, {Component} from 'react';
import {Label, Table, Pagination, Icon} from "semantic-ui-react";
import moment from 'moment';
import EditModal from "../../Modals/EditModal/EditModal";
import RemoveModal from "../../Modals/RemoveModal/RemoveModal";
import withLoading from "../../../hoc/withLoading";
import withOperations from "../../../hoc/withOperations";
import OperationsTableLoading from "../OperationsTableLoading/OperationsTableLoading";
import {withRouter} from "react-router-dom";

class OperationsTable extends Component {

	onPaginationChanged = (e, {activePage}) => {
		const {pathname, search} = this.props.location;
		const searchParams = new URLSearchParams(search);
		this.props.history.push({
			pathname,
			search: `?page=${activePage}&offset=${searchParams.get('offset')}`
		})
	};

	render() {
		const { operations, pagination: {page, lastPage} } = this.props;
		let firstDayOfMonth = moment().startOf('month');
		if(operations.length > 0){
			firstDayOfMonth = moment(operations[0].date).startOf('month');
		}

		return (
			<Table celled stackable>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell width={2}>Date</Table.HeaderCell>
						<Table.HeaderCell>Catégorie</Table.HeaderCell>
						<Table.HeaderCell width={9}>Libellé</Table.HeaderCell>
						<Table.HeaderCell>Crédit</Table.HeaderCell>
						<Table.HeaderCell>Débit</Table.HeaderCell>
						<Table.HeaderCell>Action</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{operations.map((operation, index) => {
						let isLabel = false;
						if(operation.date.startOf('month') < firstDayOfMonth) {
							firstDayOfMonth = moment(operation.date).startOf('month');
							isLabel = true;
						}

						const label = <Label color="blue" ribbon>{firstDayOfMonth.format('MMMM YYYY')}</Label>;
						return (
							<Table.Row key={index}>
								<Table.Cell>
									{isLabel ? label : null}
									{operation.date.format('DD/MM/YYYY')}
								</Table.Cell>
								<Table.Cell>
									{operation.category}
								</Table.Cell>
								<Table.Cell>
									<div className="cut-too-long">{operation.label}</div>
									{operation.tags.map((tag, index) => {
										return (
											<Label key={index} as='span' tag>{tag}</Label>
										);
									})}
								</Table.Cell>
								<Table.Cell>{operation.credit}</Table.Cell>
								<Table.Cell>{operation.debit}</Table.Cell>
								<Table.Cell className="nowrap">
									<EditModal
										operation={operation}
										onEdit={this.onEdit}
									/>
									<RemoveModal
										onYes={() => this.onRemove(operation.id)}
									/>
								</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>

				<Table.Footer>
					<Table.Row>
						<Table.HeaderCell colSpan='6'>
							<Pagination
								floated="right"
								defaultActivePage={page}
								ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
								firstItem={{ content: <Icon name='angle double left' />, icon: true }}
								lastItem={{ content: <Icon name='angle double right' />, icon: true }}
								prevItem={{ content: <Icon name='angle left' />, icon: true }}
								nextItem={{ content: <Icon name='angle right' />, icon: true }}
								totalPages={lastPage}
								onPageChange={this.onPaginationChanged}
							/>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Footer>
			</Table>
		);
	}
}

export default withRouter(withLoading(withOperations(OperationsTable), OperationsTableLoading));