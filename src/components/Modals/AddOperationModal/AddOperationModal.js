import React, {Component} from 'react';
import {Button, Header, Icon, Modal} from 'semantic-ui-react'
import OperationForm, {formName} from "../../Forms/OperationForm/OperationForm";
import moment from "moment";
import createSubmit from '../../../hoc/createSubmit';
import withModal from "../../../hoc/withModal";
import {submit} from "redux-form";
import {connect} from "react-redux";

class AddOperationModal extends Component {
	componentDidMount() {
		this.props.onRef(this)
	}

	onKeyEnter = () => {
		this.props.dispatch(submit(formName));
	};

	render() {
		const SubmitButton = createSubmit(formName, <Button color='green'><Icon name='checkmark' /> Add</Button>);
		return (
			<Modal
				trigger={<Button circular icon color="green" labelPosition='right' onClick={this.props.open}><Icon name="add" />Ajouter</Button>}
				dimmer="blurring"
				open={this.props.isOpen}
				onClose={this.props.close}
				closeOnEscape={this.props.closeable}
				closeOnDimmerClick={this.props.closeable}
			>
				<Header icon='archive' content='Add operation' />
				<Modal.Content>
					<Modal.Description>
						<Header>Ajouter une opération</Header>
						<OperationForm
							initialValues={{
								date: moment().toDate(),
							}}
							onSubmitSuccess={this.props.close}
						/>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button color='red' onClick={this.props.close}>
						<Icon name='remove' /> Cancel
					</Button>
					<SubmitButton />
				</Modal.Actions>
			</Modal>
		);
	}
}

export default connect(
	(state) => ({
		form: state.form[formName]
	})
)
(withModal(AddOperationModal));