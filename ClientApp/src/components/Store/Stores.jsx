import React from 'react';
import { Component } from 'react';
import { AddStore } from './AddStore';
import { UpdateStore } from './UpdateStore';
import { DeleteStore } from './DeleteStore';
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

export class Stores extends Component {
    constructor(props) {
       super(props);
        this.state = {
            stores: [],
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

    handleStoreAdded = (newStore) => {
        this.setState((prevState) => ({
            stores: [...prevState.stores, newStore]
        }));
    }

    handleStoreUpdate = (updatedStore) => {
        this.setState(prevState => ({
            stores: prevState.stores.map(store =>
                store.id === updatedStore.id ? updatedStore : store)
        }));
    }

    handleStoreDelete = (deletedStoreId) => {
        this.setState(prevState => ({
            stores: prevState.stores.filter((s) => s.id !== deletedStoreId)
        }));
    }

    handleSort = (field) => {
        const { stores, sortField, isAscending } = this.state;

        const sortedData = [...stores].sort((a, b) => {
            const valueA = a[field].toString();
            const valueB = b[field].toString();

            //function to handle alphanumeric sorting
            return isAscending
                ? valueA.localeCompare(valueB, undefined, { numeric: true, sensitivity: 'base' })
                : valueB.localeCompare(valueA, undefined, { numeric: true, sensitivity: 'base' });
        });

        this.setState({
            stores: sortedData,
            sortField: field,
            isAscending: !isAscending,
        });
    };

    componentDidMount() {
        this.populateStoreData();
    }

    renderStoresTable() {  
        const { stores, activePage, itemsPerPage, recordsPerPageOptions, sortField, isAscending } = this.state;
        

        // pagination
        const startIndex = (activePage - 1) * itemsPerPage;
        const paginatedStores = stores.slice(startIndex, startIndex + itemsPerPage);


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
                        {paginatedStores.map(store =>
                            <TableRow key={store.id}>
                                <TableCell>{store.name}</TableCell>
                                <TableCell>{store.address}</TableCell>
                            <TableCell>
                                    <UpdateStore selectedStore={store} onStoreUpdated={this.handleStoreUpdate} />
                            </TableCell>
                            <TableCell>
                                    <DeleteStore selectedStoreId={store.id} onStoreDeleted={this.handleStoreDelete} />
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
                    totalPages={Math.ceil(stores.length / itemsPerPage)}
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
            : this.renderStoresTable(this.state.stores);

        return (
            <div>
                <h1 id="tableLabel">Stores</h1>
                <AddStore onStoreAdded={this.handleStoreAdded} />
                {contents}
            </div>
        );
    }

    async populateStoreData() {
        const response = await fetch('/store/get');
        const data = await response.json();
        this.setState({ stores: data, loading: false });
       
    }
}
