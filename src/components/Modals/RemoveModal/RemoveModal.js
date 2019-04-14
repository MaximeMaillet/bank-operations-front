import React, {Component} from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

class RemoveModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  handleClose = () => this.setState({ modalOpen: false });
  handleOpen = () => this.setState({ modalOpen: true });

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
          <Button color='green' inverted onClick={() => {
            this.props.onYes();
            this.handleClose()
          }}>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default RemoveModal;