import React, {Component} from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import handleApiToastMessage from "../../../lib/handleApiToastMessage";
import api from '../../../lib/api';
import handleNotAuthorized from "../../../lib/handleNotAuthorized";
import {connect} from "react-redux";
import actions from "../../../redux/operations/actions";
import actionsUser from "../../../redux/user/actions";

class RemoveModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  handleClose = () => this.setState({ modalOpen: false });
  handleOpen = () => this.setState({ modalOpen: true });

  remove = () => {
    return api('DELETE', `/users/operations/${this.props.operation.id}`)
      .then(this.props.reloadOperations)
      .catch((e) => e.status === 401 ? this.props.logout() : true)
      .catch(handleApiToastMessage)
    ;
  };

  render() {
    return (
      <Modal
        trigger={<Button circular inverted color="red" icon='delete' onClick={this.handleOpen} />}
        open={this.state.modalOpen}
        basic size='small'>
        <Header icon='archive' content='Are you sure to remove this operation ?' />
        <Modal.Actions>
          <Button basic color='red' inverted onClick={this.handleClose}>
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
    reloadOperations: () => dispatch(actions.reLoad()),
    logout: () => dispatch(actionsUser.logout())
  }))
(RemoveModal);