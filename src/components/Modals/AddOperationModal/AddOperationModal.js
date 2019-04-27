import React, {Component} from 'react';
import {Button, Header, Icon, Modal} from 'semantic-ui-react'
import OperationForm, {formName} from "../../Forms/OperationForm/OperationForm";
import moment from "moment";
import createSubmit from '../../../hoc/createSubmit';

class AddOperationModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		}
	}

	handleClose = () => this.setState({ modalOpen: false });
	handleOpen = () => this.setState({ modalOpen: true });

	add = async() => {
		this.setState({submit: true});
	};

	render() {
		const SubmitButton = createSubmit(formName, <Button color='green'><Icon name='checkmark' /> Add</Button>);
		return (
			<Modal
				trigger={<Button circular icon color="green" labelPosition='right' onClick={this.handleOpen}><Icon name="add" />Ajouter</Button>}
				open={this.state.modalOpen}
				dimmer="blurring"
			>
				<Header icon='archive' content='Add operation' />
				<Modal.Content>
					<Modal.Description>
						<Header>Ajouter une opération</Header>
						<OperationForm
							initialValues={{
								date: moment().toDate(),
								label: 'putaing',
								category: 'famille',
							}}
							onSubmit={this.onSubmit}
							submit={this.state.submit}
						/>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button color='red' onClick={this.handleClose}>
						<Icon name='remove' /> Cancel
					</Button>
					<SubmitButton />
				</Modal.Actions>
			</Modal>
		);
	}
}

export default AddOperationModal;