import React, {Component} from 'react';
import {Button, Form, Header, Icon, Modal} from 'semantic-ui-react'
import OperationForm, {formName} from "../../Forms/OperationForm/OperationForm";
import createSubmit from "../../../hoc/createSubmit";

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  handleClose = () => this.setState({ modalOpen: false });
  handleOpen = () => this.setState({ modalOpen: true });

  onSubmit = (values) => {
    this.setState({submit: false});
    this.props.onEdit(values);
    this.handleClose();
  };

  edit = async() => {
    this.setState({submit: true});
  };

  render() {
    const {operation} = this.props;
    const SubmitButton = createSubmit(formName, <Button color='green'><Icon name='checkmark' /> Edit</Button>);

    return (
      <Modal
        trigger={<Button circular color="blue" icon='edit' onClick={this.handleOpen} />}
        open={this.state.modalOpen}
        dimmer="blurring"
      >
        <Header icon='archive' content='Edit' />
        <Modal.Content>
          <Modal.Description>
            <Header>{operation.label}</Header>
            <OperationForm
              initialValues={{
                ...operation,
                date: operation.date.toDate(),
                tags: operation.tags.map((item) => ({label: item, key: item, value: item}))
              }}
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

export default EditModal;