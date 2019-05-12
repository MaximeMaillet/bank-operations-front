import React, {Component} from 'react';
import {Header, Table} from "semantic-ui-react";

/**
 * @todo
 */
export default class ExcelPreviewComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			titles: []
		}
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if(nextProps.file && this.props.file !== nextProps.file) {
			this.readFile(nextProps.file)
		}
	}

	readFile = (file) => {
		const reader = new FileReader();
		reader.onabort = () => console.log('file reading was aborted')
		reader.onerror = () => console.log('file reading has failed')
		reader.onload = () => {
			const binaryStr = reader.result;
			const lines = binaryStr.split(/\r\n|\n/);
			const columns = [];
			for(const i in lines) {
				const column = lines[i].split(';');
				if(column.length >= 4) {
					columns.push(column);
				}
			}

			let nbColumns = 0;
			for(const i in columns) {
				if(columns[i].length > nbColumns) {
					nbColumns = columns[i].length;
				}
			}

			const doc = [];
			const titleFirstLine = '*ABCDEFGHIJKLMNOPQRSTUVWXYZ';
			const firstLine = [];
			for(let j=0; j<nbColumns+1; j++) {
				firstLine.push(titleFirstLine[j])
			}
			doc.push(firstLine);

			for(let i=0; i<columns.length; i++) {
				const line = [];
				for(let j=-1; j<nbColumns; j++) {
					if(j === -1) {
						line.push(i+1)
					} else {
						line.push(columns[i][j])
					}
				}

				doc.push(line)
			}

			this.setState({
				titles: doc,
				nbLines: columns.length + 1,
				nbColumns: nbColumns,
			})
		};

		reader.readAsBinaryString(file)
	};

	render() {
		const {titles, nbLines, nbColumns} = this.state;
		return (
			<Table celled padded>
				<Table.Body>
					{titles && titles.map((title, indexT) => {
						console.log(title)
						return (
							<Table.Row key={indexT}>
								{title.map((colName, indexC) => {
									if(indexT === 0) {
										return (
											<Table.HeaderCell key={indexC}>{colName}</Table.HeaderCell>
										);
									}
									return (
									<Table.Cell key={indexC}>{colName}</Table.Cell>
								)})}
							</Table.Row>
						)})}
				</Table.Body>
			</Table>
		);
	}
}