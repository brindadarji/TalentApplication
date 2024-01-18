import React from 'react';
import { Component } from 'react';
import { AddCustomer } from './AddCustomer';
import { UpdateCustomer } from './UpdateCustomer';
import { DeleteCustomer } from './DeleteCustomer';
import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableCell,
    TableBody,
    Table,
    Pagination,
    Dropdown,
    Icon
} from 'semantic-ui-react';

export class Customers extends Component {
    constructor(props) {
       super(props);
        this.state = {
            customers: [],
            loading: true,
            activePage: 1,
            itemsPerPage: 10,
            recordsPerPageOptions: [5, 10, 15, 20, 25, 30, 50, 100],
            sortField: null,
            isAscending: true,
        };
    }

    handlePageChange = (e, { activePage }) => {
        this.setState({ activePage });
    };

    handleRecordsPerPageChange = (e, { value }) => {
        this.setState({ itemsPerPage: value, activePage: 1 });
    };

    handleCustomerAdded = (newCustomer) => {
        this.setState((prevState) => ({
            customers: [...prevState.customers, newCustomer]
        }));
    }

    handleCustomerUpdate = (updatedCustomer) => {
        this.setState(prevState => ({
            customers: prevState.customers.map(customer =>
                customer.id === updatedCustomer.id ? updatedCustomer : customer)
        }));
    }

    handleCustomerDelete = (deletedCustomerId) => {
        this.setState(prevState => ({
            customers: prevState.customers.filter((c) => c.id !== deletedCustomerId)
        }));
    }

    handleSort = (field) => {
        const { customers, sortField, isAscending } = this.state;

        const sortedData = [...customers].sort((a, b) => {
            const valueA = a[field].toString();
            const valueB = b[field].toString();

            //function to handle alphanumeric sorting
            return isAscending
                ? valueA.localeCompare(valueB, undefined, { numeric: true, sensitivity: 'base' })
                : valueB.localeCompare(valueA, undefined, { numeric: true, sensitivity: 'base' });
        });

        this.setState({
            customers: sortedData,
            sortField: field,
            isAscending: !isAscending,
        });
    };


    componentDidMount() {
        this.populateCustomerData();
    }

    renderCustomersTable() {  
        const { customers, activePage, itemsPerPage, recordsPerPageOptions, sortField, isAscending } = this.state;
        

        // pagination
        const startIndex = (activePage - 1) * itemsPerPage;
        const paginatedCustomers = customers.slice(startIndex, startIndex + itemsPerPage);


        return (
            <div>
            <div className='divList container__table'>
              <Table celled fixed singleLine striped>
                <TableHeader>
                  <TableRow>
                   <TableHeaderCell onClick={() => this.handleSort('name')}>Name<Icon className='icon-sort'>▼▲</Icon></TableHeaderCell>
                   <TableHeaderCell onClick={() => this.handleSort('address')}>Address<Icon className='icon-sort'>▼▲</Icon></TableHeaderCell>
                    <TableHeaderCell>Action</TableHeaderCell>
                    <TableHeaderCell>Action</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedCustomers.map(customer =>
                        <TableRow key={customer.id}>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{customer.address}</TableCell>
                            <TableCell>
                                <UpdateCustomer selectedCustomer={customer} onCustomerUpdated={this.handleCustomerUpdate} />
                            </TableCell>
                            <TableCell>
                                <DeleteCustomer selectedCustomerId={customer.id} onCustomerDeleted={this.handleCustomerDelete} />
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                </Table>  
            </div>
           <div className='divList'>
            <Dropdown
                     selection
                     compact
                     options={recordsPerPageOptions.map(option => ({
                     key: option,
                     text: `${option}`,
                     value: option,
                     }))}
                     value={itemsPerPage}
                     onChange={this.handleRecordsPerPageChange}
            />
            <Pagination
                    activePage={activePage}
                    totalPages={Math.ceil(customers.length / itemsPerPage)}
                    onPageChange={this.handlePageChange}
                    floated='right'
            />
            </div>
           </div>
        );
    }
  
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCustomersTable(this.state.customers);

        return (
            <div>
                <h1 id="tableLabel">Customers</h1>
                <AddCustomer onCustomerAdded={this.handleCustomerAdded} />
                {contents}
            </div>
        );
    }

    async populateCustomerData() {
        const response = await fetch('/customer/get');
        const data = await response.json();
        this.setState({ customers: data, loading: false });
    }
}
