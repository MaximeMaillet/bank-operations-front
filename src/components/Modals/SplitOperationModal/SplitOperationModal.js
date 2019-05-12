import React, {Component} from 'react';
import {Button, Header, Icon, Modal, Card, Image} from 'semantic-ui-react'
import createSubmit from "../../../hoc/createSubmit";
import withModal from "../../../hoc/withModal";
import {connect} from "react-redux";
import FormLoader from "../../Loaders/FormLoader/FormLoader";
import get from 'lodash.get'
import {FieldArray, submit} from "redux-form";

import './splitOperationModal.scss'
import SplitForm, {formName} from "../../Forms/SplitForm/SplitForm";
import moment from "moment";

class SplitOperationModal extends Component {
	componentDidMount() {
		this.props.onRef(this)
	}

	onKeyEnter = () => {
		this.props.dispatch(submit(formName));
	};

	componentWillReceiveProps(nextProps, nextContext) {
		if(get(nextProps, 'form.triggerSubmit', false)) {
			this.props.lockClose();
		}
	}

	render() {
		const {operation} = this.props;
		const SubmitButton = createSubmit(formName, <Button color='green'><Icon name='checkmark' /> Split</Button>);
		return (
			<Modal
				trigger={<Button circular color="green" inverted icon='cut' onClick={this.props.open} />}
				open={this.props.isOpen}
				onClose={this.props.close}
				closeOnEscape={this.props.closeable}
				closeOnDimmerClick={this.props.closeable}
				dimmer="blurring"
				className="modal split-operation"
			>
				<FormLoader active={get(this.props, 'form.submitting', false)} />
				<Header icon='cut' content='Split' />
				<Modal.Content>
					<Modal.Description>
						<Card.Group style={{marginBottom: '1em'}}>
							<Card
								fluid
								color='teal'
							>
								<Card.Content>
									<Card.Header>{operation.label}</Card.Header>
									<Card.Meta>{`${operation.category} - ${operation.date.format('DD/MM/YYYY')}`}</Card.Meta>
								</Card.Content>
								<Card.Content extra>
									{operation.credit > 0 ? `${operation.credit} €` : `${operation.debit} €`}
								</Card.Content>
							</Card>
						</Card.Group>

						<SplitForm
							operation={operation}
							initialValues={{
								id: operation.id,
								subs: operation.subs,
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
)(withModal(SplitOperationModal))