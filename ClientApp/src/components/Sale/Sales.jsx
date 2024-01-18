import React from 'react';
import { Component } from 'react';
import { AddSale } from './AddSale';
import { UpdateSale } from './UpdateSale';
import { DeleteSale } from './DeleteSale';
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

export class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sales: [],
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

    handleSaleAdded = (newSale) => {
        this.setState((prevState) => ({
            sales: [...prevState.sales, newSale]
        }));
    }

    handleSaleUpdate = (updatedSale) => {
        this.setState(prevState => ({
            sales: prevState.sales.map(sale =>
                sale.id === updatedSale.id ? updatedSale : sale)
        }));
    }

    handleSaleDelete = (deletedSaleId) => {
        this.setState(prevState => ({
            sales: prevState.sales.filter((c) => c.id !== deletedSaleId)
        }));
    }

    handleSort = (field) => {
        const { sales, sortField, isAscending } = this.state;

        const sortedData = [...sales].sort((a, b) => {
            const valueA = a[field].toString();
            const valueB = b[field].toString();

            //function to handle alphanumeric sorting
            return isAscending
                ? valueA.localeCompare(valueB, undefined, { numeric: true, sensitivity: 'base' })
                : valueB.localeCompare(valueA, undefined, { numeric: true, sensitivity: 'base' });
        });

        this.setState({
            sales: sortedData,
            sortField: field,
            isAscending: !isAscending,
        });
    };

    componentDidMount() {
        this.populateSaleData();
    }

    renderSalesTable() {
        const { sales, activePage, itemsPerPage, recordsPerPageOptions } = this.state;


        // pagination
        const startIndex = (activePage - 1) * itemsPerPage;
        const paginatedSales = sales.slice(startIndex, startIndex + itemsPerPage);


        return (
            <div>
            <div className='divList container__table'>
                <Table celled fixed singleLine striped>
                    <TableHeader>
                        <TableRow>
                                <TableHeaderCell onClick={() => this.handleSort('customerName')}>Customer<Icon className='icon-sort'>▼▲</Icon></TableHeaderCell>
                                <TableHeaderCell onClick={() => this.handleSort('productName')}>Product<Icon className='icon-sort'>▼▲</Icon></TableHeaderCell>
                                <TableHeaderCell onClick={() => this.handleSort('storeName')}>Store<Icon className='icon-sort'>▼▲</Icon></TableHeaderCell>
                                <TableHeaderCell onClick={() => this.handleSort('dateSold')}>DateSold<Icon className='icon-sort'>▼▲</Icon></TableHeaderCell>
                            <TableHeaderCell>Action</TableHeaderCell>
                            <TableHeaderCell>Action</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedSales.map(sale =>
                            <TableRow key={sale.id}>
                                <TableCell>{sale.customerName}</TableCell>
                                <TableCell>{sale.productName}</TableCell>
                                <TableCell>{sale.storeName}</TableCell>
                                <TableCell>{
                                      new Date(sale.dateSold).toLocaleDateString('en-GB', {
                                      day: 'numeric',
                                      month: 'short',
                                      })
                                    }, { new Date(sale.dateSold).getFullYear() }</TableCell>
                                <TableCell>
                                    <UpdateSale
                                        selectedSale={sale}
                                        customerId={sale.customerId}
                                        productId={sale.productId} 
                                        storeId={sale.storeId }
                                        onSaleUpdated={this.handleSaleUpdate} />
                                </TableCell>
                                <TableCell>
                                    <DeleteSale selectedSaleId={sale.id} onSaleDeleted={this.handleSaleDelete} />
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
                    totalPages={Math.ceil(sales.length / itemsPerPage)}
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
            : this.renderSalesTable(this.state.sales);

        return (
            <div>
                <h1 id="tableLabel">Sales</h1>
                <AddSale onSaleAdded={this.handleSaleAdded} />
                {contents}
            </div>
        );
    }

    async populateSaleData() {
        const response = await fetch('/sale/get');
        const data = await response.json();
        this.setState({ sales: data, loading: false });
    }

}
