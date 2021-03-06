import React, { Component } from 'react';
import {Container, Header, Responsive} from 'semantic-ui-react'
import AddOperationModal from "../../../components/Modals/AddOperationModal/AddOperationModal";
import TopHeader from "../../../components/TopHeader/TopHeader";
import shouldLogged from "../../../hoc/shouldLogged";
import OperationsTable from "../../../components/Operations/OperationsTable/OperationsTable";

import './dashboard.scss';
import StatsMonth from "../../../components/StatsMonth/StatsMonth";
import FilterPeriod from "../../../components/FilterPeriod/FilterPeriod";
import ImportOperationModal from "../../../components/Modals/ImportOperationsModal/ImportOperationModal";

class Dashboard extends Component {
  render() {
    return (
    	<Responsive>
		    <TopHeader/>
		    <Container className='dashboard'>
			    <FilterPeriod />
          <StatsMonth />
			    <Header as='h2'>Dasboard</Header>
          <div className="actions">
            <div className="buttons">
              <AddOperationModal />
              <ImportOperationModal />
            </div>
          </div>
			    <OperationsTable />
		    </Container>
	    </Responsive>
    );
  }
}

export default shouldLogged(Dashboard);
