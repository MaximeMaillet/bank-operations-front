import React, {Component} from 'react';
import {Label, Table, Pagination, Icon} from "semantic-ui-react";
import moment from 'moment';
import EditOperationModal from "../../Modals/EditOperationModal/EditOperationModal";
import RemoveModal from "../../Modals/RemoveOperationModal/RemoveOperationModal";
import withOperations from "../../../hoc/withOperations";
import {withRouter} from "react-router-dom";
import get from 'lodash.get';
import queryString from "query-string";
import SplitOperationModal from "../../Modals/SplitOperaationModal/SplitOperationModal";

class OperationsTable extends Component {

	onPaginationChanged = (e, {activePage}) => {
		const {pathname, search} = this.props.location;
		const params = queryString.parse(search);
		params.page = activePage;
		this.props.history.push({
			pathname,
			search: queryString.stringify(params)
		})
	};

	render() {
		const { operations, hasPagination, pagination} = this.props;
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
						if(moment(operation.date).startOf('month') < firstDayOfMonth) {
							firstDayOfMonth = operation.date.startOf('month');
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
					})}
				</Table.Body>

				<Table.Footer>
					<Table.Row>
						<Table.HeaderCell colSpan='3' />
						<Table.HeaderCell>{get(this.props, 'total.credit',0)}</Table.HeaderCell>
						<Table.HeaderCell>{get(this.props, 'total.debit', 0)}</Table.HeaderCell>
						<Table.HeaderCell />
					</Table.Row>
					{hasPagination &&
					<Table.Row>
						<Table.HeaderCell colSpan='6'>
							<Pagination
								floated="right"
								defaultActivePage={pagination.page}
								ellipsisItem={{content: <Icon name='ellipsis horizontal'/>, icon: true}}
								firstItem={{content: <Icon name='angle double left'/>, icon: true}}
								lastItem={{content: <Icon name='angle double right'/>, icon: true}}
								prevItem={{content: <Icon name='angle left'/>, icon: true}}
								nextItem={{content: <Icon name='angle right'/>, icon: true}}
								totalPages={pagination.lastPage}
								onPageChange={this.onPaginationChanged}
							/>
						</Table.HeaderCell>
					</Table.Row>
					}
				</Table.Footer>
			</Table>
		);
	}
}

export default withRouter(withOperations(OperationsTable));