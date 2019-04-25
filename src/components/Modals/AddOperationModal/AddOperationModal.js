import React, {Component} from 'react';
import {Button, Form, Header, Icon, Modal, Segment} from 'semantic-ui-react'
import OperationForm from "../../Forms/OperationForm/OperationForm";

class AddOperationModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		}
	}

	handleClose = () => this.setState({ modalOpen: false });
	handleOpen = () => this.setState({ modalOpen: true });

	onSubmit = async(values) => {
		try {
			this.setState({submit: false});
			const response = await fetch(`${process.env.REACT_APP_REST_API_LOCATION}/api/users/operations`, {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify(values)
			});
			if(response.status === 401) {
				this.setState({redirect: true});
				return;
			}

			this.props.onOperationAdded(values);
			this.handleClose();
		} catch(e) {
			console.log(e);
		}
	};

	add = async() => {
		this.setState({submit: true});
	};

	render() {
		return (
			<Modal
				trigger={<Button circular icon color="green" labelPosition='right' onClick={this.handleOpen}><Icon name="add" />Ajouter</Button>}
				open={this.state.modalOpen}
				dimmer="blurring"
			>
				<Header icon='archive' content='Edit' />
				<Modal.Content>
					<Modal.Description>
						<Header>Ajouter une opération</Header>
						<OperationForm onSubmit={this.onSubmit} submit={this.state.submit} />
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button color='red' onClick={this.handleClose}>
						<Icon name='remove' /> Cancel
					</Button>
					<Button color='green' onClick={this.add}>
						<Icon name='checkmark' /> Add
					</Button>
				</Modal.Actions>
			</Modal>
		);
	}
}

export default AddOperationModal;