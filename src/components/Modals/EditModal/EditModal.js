import React, {Component} from 'react';
import {Button, Form, Header, Icon, Modal, Segment} from 'semantic-ui-react'
import OperationForm from "../../Forms/OperationForm/OperationForm";

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
    const {values} = this.state;
    return (
      <Modal
        trigger={<Button circular color="blue" icon='edit' onClick={this.handleOpen} />}
        open={this.state.modalOpen}
        dimmer="blurring"
      >
        <Header icon='archive' content='Edit' />
        <Modal.Content>
          <Modal.Description>
            <Header>{operation.label_str}</Header>
            <OperationForm operation={operation} onSubmit={this.onSubmit} submit={this.state.submit} />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.handleClose}>
            <Icon name='remove' /> Cancel
          </Button>
          <Button color='green' onClick={this.edit}>
            <Icon name='checkmark' /> Edit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default EditModal;