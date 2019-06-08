import React, {Component} from 'react';
import {Table, Pagination, Icon} from "semantic-ui-react";
import moment from 'moment';
import withOperations from "../../../hoc/withOperations";
import {withRouter} from "react-router-dom";
import get from 'lodash.get';
import queryString from "query-string";
import OperationTableRowSub from "./OperationTableRowSub";
import OperationTableRow from "./OperationTableRow";

import './operationsTable.scss'

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
						return <OperationTableRow key={index} operation={operation} firstDayOfMonth={firstDayOfMonth} />
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
