import React, { Component } from 'react';
import {Button, Container, Header, Icon, Responsive} from 'semantic-ui-react'
import AddOperationModal from "../../../components/Modals/AddOperationModal/AddOperationModal";
import TopHeader from "../../../components/TopHeader/TopHeader";
import shouldLogged from "../../../hoc/shouldLogged";
import OperationsTable from "../../../components/Operations/OperationsTable/OperationsTable";

import './dashboard.scss';

class Dashboard extends Component {

  onRemove = async(operationId) => {

  };

  onEdit = async(values) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_REST_API_LOCATION}/api/users/operations/${values.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify(values)
      });
      if(response.status === 401) {
        this.setState({redirect: true});
        return;
      }

      this.loadOperations(this.state);
    } catch(e) {
      console.log(e);
    }
  };

  render() {
    return (
    	<Responsive>
		    <TopHeader/>
		    <Container className='dashboard'>
			    <Header as='h2'>Dasboard</Header>
          <div className="actions">
            <div className="buttons">
              <AddOperationModal />
              <Button circular icon color="blue" labelPosition='right'><Icon name="upload" />Import</Button>
            </div>
          </div>
			    <OperationsTable />
		    </Container>
	    </Responsive>
    );
  }
}

export default shouldLogged(Dashboard);
