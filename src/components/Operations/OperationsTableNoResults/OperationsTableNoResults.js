import React, {Component} from 'react';
import {Table} from "semantic-ui-react";

export default class OperationsTableNoResults extends Component {
	render() {
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
					<Table.Row>
						<Table.Cell colSpan='6'>
							Aucun résultat
						</Table.Cell>
					</Table.Row>

				</Table.Body>
			</Table>
		);
	}
}