import React, { Component } from 'react';
import {Button, Container, Header, Icon, Responsive, Step, Statistic} from 'semantic-ui-react'
import AddOperationModal from "../../../components/Modals/AddOperationModal/AddOperationModal";
import TopHeader from "../../../components/TopHeader/TopHeader";
import shouldLogged from "../../../hoc/shouldLogged";
import OperationsTable from "../../../components/Operations/OperationsTable/OperationsTable";

import './dashboard.scss';
import StatsMonth from "../../../components/StatsMonth/StatsMonth";

class Dashboard extends Component {
  render() {
    return (
    	<Responsive>
		    <TopHeader/>
		    <Container className='dashboard'>
          <StatsMonth />
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
