import React, {Component} from 'react';
import {Button, Header, Icon, Modal} from 'semantic-ui-react'
import createSubmit from '../../../hoc/createSubmit';
import withModal from "../../../hoc/withModal";
import {submit} from "redux-form";
import {connect} from "react-redux";
import ImportForm, {formName} from "../../Forms/ImportForm/ImportForm";

class ImportOperationModal extends Component {
	componentDidMount() {
		this.props.onRef(this)
	}

	onKeyEnter = () => {
		this.props.dispatch(submit(formName));
	};

	render() {
		const SubmitButton = createSubmit(formName, <Button color='green'><Icon name='checkmark' /> Import</Button>);
		return (
			<Modal
				trigger={<Button circular icon color="blue" labelPosition='right' onClick={this.props.open}><Icon name="upload" />Import</Button>}
				dimmer="blurring"
				open={this.props.isOpen}
				onClose={this.props.close}
				closeOnEscape={this.props.closeable}
				closeOnDimmerClick={this.props.closeable}
			>
				<Header icon='upload' content='Import operation' />
				<Modal.Content>
					<Modal.Description>
						<ImportForm
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
)(withModal(ImportOperationModal));
