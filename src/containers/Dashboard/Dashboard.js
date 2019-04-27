import React, { Component } from 'react';
import moment from 'moment';

import { Container, Header, Icon, Label, Button, Table, Pagination, Menu, Segment, Responsive } from 'semantic-ui-react'
import history from "../../routes/history";
import RemoveModal from "../../components/Modals/RemoveModal/RemoveModal";
import EditModal from "../../components/Modals/EditModal/EditModal";
import {Redirect} from "react-router-dom";
import AddOperationModal from "../../components/Modals/AddOperationModal/AddOperationModal";
import TopHeader from "../../components/TopHeader/TopHeader";
import shouldLogged from "../../hoc/shouldLogged";
// import Pagination from "../../components/Pagination/Pagination";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    const search = new URLSearchParams(this.props.location.search);
    this.state = {
      redirect: false,
      page: search.get('page') || 1,
      offset: search.get('offset') || 20,
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const prevSearch = new URLSearchParams(this.props.location.search);
    const search = new URLSearchParams(nextProps.location.search);
    if(prevSearch.get('page') !== search.get('page') || prevSearch.get('offset') !== search.get('offset')) {
      this.setState({
        page: search.get('page'),
        offset: search.get('offset'),
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (!!nextState.operations && !!nextState.page && !!nextState.lastPage) || nextState.redirect;
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    const prevSearch = new URLSearchParams(this.props.location.search);
    const search = new URLSearchParams(nextProps.location.search);
    if(prevSearch.get('page') !== search.get('page') || prevSearch.get('offset') !== search.get('offset')) {
      this.loadOperations(nextState);
    }
  }

  componentDidMount() {
    this.loadOperations(this.state);
  }

  loadOperations = async(data) => {
    const params = new URLSearchParams();
    params.set('page', data.page);
    params.set('offset', data.offset);

    try {
      const response = await fetch(`${process.env.REACT_APP_REST_API_LOCATION}/api/users/operations?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      if(response.status === 401) {
        this.setState({redirect: true});
        return;
      }
      const {operations, pagination: {page, lastPage, pageSize: offset}} = await response.json();
      this.setState({
        operations: operations.map((ope) => {
          return {
            ...ope,
            date: moment(ope.date),
          }
        }),
        lastPage,
        page,
        offset
      });
    } catch(e) {
      console.log(e);
    }
  };

  onPaginationChanged = (e, {activePage}) => {
    const {pathname} = this.props.location;
    let {offset} = this.state;
    history.push({
      pathname,
      search: `?page=${activePage}&offset=${offset}`
    })
  };

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
    this.loadOperations(this.state);
  };

  render() {
    if(this.state.redirect) {
      return <Redirect to='/' />
    }

    const {page, lastPage, operations} = this.state;
    if(!operations || !page || !lastPage) {
      return null;
    }

    let firstDayOfMonth = moment().startOf('month');
    if(operations.length > 0){
      firstDayOfMonth = moment(operations[0].date).startOf('month');
    }

    let fixed = false;

    return (
    	<Responsive>
		    <TopHeader/>
		    <Container className='dashboard'>
			    <AddOperationModal onOperationAdded={this.onOperationAdded} />
			    <Header as='h2'>Dasboard 2</Header>
			    <Table celled stackable>
				    <Table.Header>
					    <Table.Row>
						    <Table.HeaderCell width={2}>Date</Table.HeaderCell>
						    <Table.HeaderCell>Catégorie</Table.HeaderCell>
						    <Table.HeaderCell width={9}>Libellé</Table.HeaderCell>
						    <Table.HeaderCell>Crédit</Table.HeaderCell>
						    <Table.HeaderCell>Débit</Table.HeaderCell>
						    <Table.HeaderCell>Action</Table.HeaderCell>
					    </Table.Row>
				    </Table.Header>

				    <Table.Body>
					    {operations.map((operation, index) => {
						    let isLabel = false;
						    if(moment(operation.date).startOf('month') < firstDayOfMonth) {
							    firstDayOfMonth = moment(operation.date).startOf('month');
							    isLabel = true;
						    }

						    const label = <Label color="blue" ribbon>{firstDayOfMonth.format('MMMM YYYY')}</Label>;
						    return (
							    <Table.Row key={index}>
								    <Table.Cell>
									    {isLabel ? label : null}
									    {operation.date.format('DD/MM/YYYY')}
								    </Table.Cell>
								    <Table.Cell>
									    {operation.category}
								    </Table.Cell>
								    <Table.Cell>
									    <div className="cut-too-long">{operation.label}</div>
									    {operation.tags.map((tag, index) => {
										    return (
											    <Label key={index} as='span' tag>{tag}</Label>
										    );
									    })}
								    </Table.Cell>
								    <Table.Cell>{operation.credit}</Table.Cell>
								    <Table.Cell>{operation.debit}</Table.Cell>
								    <Table.Cell className="nowrap">
									    <EditModal
										    operation={operation}
										    onEdit={this.onEdit}
									    />
									    <RemoveModal
										    onYes={() => this.onRemove(operation.id)}
									    />
								    </Table.Cell>
							    </Table.Row>
						    );
					    })}
				    </Table.Body>

				    <Table.Footer>
					    <Table.Row>
						    <Table.HeaderCell colSpan='5'>
							    {/*<Pagination pagination={pagination} floated="right"/>*/}
							    <Pagination
								    floated="right"
								    defaultActivePage={page}
								    ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
								    firstItem={{ content: <Icon name='angle double left' />, icon: true }}
								    lastItem={{ content: <Icon name='angle double right' />, icon: true }}
								    prevItem={{ content: <Icon name='angle left' />, icon: true }}
								    nextItem={{ content: <Icon name='angle right' />, icon: true }}
								    totalPages={lastPage}
								    onPageChange={this.onPaginationChanged}
							    />
						    </Table.HeaderCell>
					    </Table.Row>
				    </Table.Footer>
			    </Table>
		    </Container>
	    </Responsive>
    );
  }
}

export default shouldLogged(Dashboard);
