import React, {Component} from 'react';
import {Button, Header, Icon, Modal} from 'semantic-ui-react'
import OperationForm, {formName} from "../../Forms/OperationForm/OperationForm";
import createSubmit from "../../../hoc/createSubmit";
import withModal from "../../../hoc/withModal";
import {connect} from "react-redux";
import FormLoader from "../../Loaders/FormLoader/FormLoader";
import get from 'lodash.get'
import {submit} from "redux-form";

class EditOperationModal extends Component {
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
    const SubmitButton = createSubmit(formName, <Button color='green'><Icon name='checkmark' /> Edit</Button>);
    return (
      <Modal
        trigger={<Button circular color="blue" icon='edit' onClick={this.props.open} />}
        open={this.props.isOpen}
        onClose={this.props.close}
        closeOnEscape={this.props.closeable}
        closeOnDimmerClick={this.props.closeable}
        dimmer="blurring"
      >
        <FormLoader active={get(this.props, 'form.submitting', false)} />
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
)(withModal(EditOperationModal))