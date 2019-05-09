import React, {Component} from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import handleApiToastMessage from "../../../lib/handleApiToastMessage";
import api from '../../../lib/api';
import handleNotAuthorized from "../../../lib/handleNotAuthorized";
import {connect} from "react-redux";
import actions from "../../../redux/operations/actions";
import actionsStats from "../../../redux/statistics/actions";
import withModal from "../../../hoc/withModal";

class RemoveOperationModal extends Component {

  remove = () => {
    return api('DELETE', `/users/operations/${this.props.operation.id}`)
      .then(this.props.reloadOperations)
      .then(this.props.reloadStats)
      .catch(handleNotAuthorized)
      .catch(handleApiToastMessage)
    ;
  };

  componentDidMount() {
    this.props.onRef(this)
  }

  onKeyEnter = () => {
    this.remove();
  };

  render() {
    return (
      <Modal
        trigger={<Button circular inverted color="red" icon='delete' onClick={this.props.open} />}
        open={this.props.isOpen}
        onClose={this.props.close}
        basic size='small'>
        <Header icon='archive' content='Are you sure to remove this operation ?' />
        <Modal.Actions>
          <Button basic color='red' inverted onClick={this.props.close}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted onClick={this.remove}>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(
  () => ({}),
  (dispatch) => ({
    reloadOperations: () => dispatch(actions.reload()),
    reloadStats: () => dispatch(actionsStats.reload()),
  })
)(withModal(RemoveOperationModal));