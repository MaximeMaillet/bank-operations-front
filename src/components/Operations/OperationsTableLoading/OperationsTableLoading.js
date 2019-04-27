import React, {Component} from 'react';
import {Table, Placeholder} from "semantic-ui-react";

export default class OperationsTableLoading extends Component {
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
						<Table.Cell>
							<Placeholder>
								<Placeholder.Paragraph>
									<Placeholder.Line />
									<Placeholder.Line />
									<Placeholder.Line />
								</Placeholder.Paragraph>
							</Placeholder>
						</Table.Cell>
						<Table.Cell>
							<Placeholder>
								<Placeholder.Paragraph>
									<Placeholder.Line />
									<Placeholder.Line />
									<Placeholder.Line />
								</Placeholder.Paragraph>
							</Placeholder>
						</Table.Cell>
						<Table.Cell>
							<Placeholder>
								<Placeholder.Paragraph>
									<Placeholder.Line />
									<Placeholder.Line />
									<Placeholder.Line />
								</Placeholder.Paragraph>
							</Placeholder>
						</Table.Cell>
						<Table.Cell>
							<Placeholder>
								<Placeholder.Paragraph>
									<Placeholder.Line />
									<Placeholder.Line />
									<Placeholder.Line />
								</Placeholder.Paragraph>
							</Placeholder>
						</Table.Cell>
						<Table.Cell>
							<Placeholder>
								<Placeholder.Paragraph>
									<Placeholder.Line />
									<Placeholder.Line />
									<Placeholder.Line />
								</Placeholder.Paragraph>
							</Placeholder>
						</Table.Cell>
						<Table.Cell>
							<Placeholder>
								<Placeholder.Paragraph>
									<Placeholder.Line />
									<Placeholder.Line />
									<Placeholder.Line />
								</Placeholder.Paragraph>
							</Placeholder>
						</Table.Cell>
					</Table.Row>

				</Table.Body>

				<Table.Footer>
					<Table.Row>
						<Table.HeaderCell colSpan='6'>
							<Placeholder>
								<Placeholder.Paragraph>
									<Placeholder.Line />
									<Placeholder.Line />
									<Placeholder.Line />
								</Placeholder.Paragraph>
							</Placeholder>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Footer>
			</Table>
		);
	}
}