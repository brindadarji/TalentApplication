import React from 'react';
import { Component } from 'react';
import { AddProduct } from './AddProduct';
import { UpdateProduct } from './UpdateProduct';
import { DeleteProduct } from './DeleteProduct';
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


export class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
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

    handleProductAdded = (newProduct) => {
        this.setState((prevState) => ({
            products: [...prevState.products, newProduct]
        }));
    }

    handleProductUpdate = (updatedProduct) => {
        this.setState(prevState => ({
            products: prevState.products.map(product =>
                product.id === updatedProduct.id ? updatedProduct : product)
        }));
    }

    handleProductDelete = (deletedProductId) => {
        this.setState(prevState => ({
            products: prevState.products.filter((p) => p.id !== deletedProductId)
        }));
    }

    handleSort = (field) => {
        const { products, sortField, isAscending } = this.state;

        const sortedData = [...products].sort((a, b) => {
            const valueA = a[field].toString();
            const valueB = b[field].toString();

            //function to handle alphanumeric sorting
            return isAscending
                ? valueA.localeCompare(valueB, undefined, { numeric: true, sensitivity: 'base' })
                : valueB.localeCompare(valueA, undefined, { numeric: true, sensitivity: 'base' });
        });

        this.setState({
            products: sortedData,
            sortField: field,
            isAscending: !isAscending,
        });
    };

    componentDidMount() {
        this.populateProductData();
    }

    renderProductsTable() {
        const { products, activePage, itemsPerPage, recordsPerPageOptions, sortField, isAscending } = this.state;

        //pagination
        const startIndex = (activePage - 1) * itemsPerPage;
        const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);


        return (
            <div>
            <div className='divList container__table'>
                <Table celled fixed singleLine striped>
                    <TableHeader>
                        <TableRow>
                                <TableHeaderCell onClick={() => this.handleSort('name')}>Name<Icon className='icon-sort'>▼▲</Icon></TableHeaderCell>
                                <TableHeaderCell onClick={() => this.handleSort('price')}>Price<Icon className='icon-sort'>▼▲</Icon></TableHeaderCell>
                            <TableHeaderCell>Action</TableHeaderCell>
                            <TableHeaderCell>Action</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedProducts.map(product =>
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell>
                                    <UpdateProduct selectedProduct={product} onProductUpdated={this.handleProductUpdate} />
                                </TableCell>
                                <TableCell>
                                    <DeleteProduct selectedProductId={product.id} onProductDeleted={this.handleProductDelete} />
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
                    totalPages={Math.ceil(products.length / itemsPerPage)}
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
            : this.renderProductsTable(this.state.products);

        return (
            <div>
                <h1 id="tableLabel">Products</h1>
                <AddProduct onProductAdded={this.handleProductAdded} />
                {contents}
            </div>
        );
    }

    async populateProductData() {
        const response = await fetch('/product/get');
        const data = await response.json();
        this.setState({ products: data, loading: false });

    }
}



