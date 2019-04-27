import React, { Component } from 'react';
import { Container, Header, Responsive } from 'semantic-ui-react'
import AddOperationModal from "../../components/Modals/AddOperationModal/AddOperationModal";
import TopHeader from "../../components/TopHeader/TopHeader";
import shouldLogged from "../../hoc/shouldLogged";
import OperationsTable from "../../components/Operations/OperationsTable/OperationsTable";

class Dashboard extends Component {

  onRemove = async(operationId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_REST_API_LOCATION}/api/users/operations/${operationId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        method: 'DELETE',
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

  onOperationAdded = (operation) => {

  };

  render() {
    return (
    	<Responsive>
		    <TopHeader/>
		    <Container className='dashboard'>
			    <AddOperationModal onOperationAdded={this.onOperationAdded} />
			    <Header as='h2'>Dasboard 2</Header>
			    <OperationsTable />
		    </Container>
	    </Responsive>
    );
  }
}

export default shouldLogged(Dashboard);
