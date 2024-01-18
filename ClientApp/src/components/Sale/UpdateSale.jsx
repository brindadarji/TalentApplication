import React, { useState } from 'react';
import { CustomerDropdown } from './CustomerDropdown';
import { ProductDropdown } from './ProductDropdown';
import { StoreDropdown } from './StoreDropdown';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    ModalHeader,
    ModalContent,
    ModalActions,
    Button,
    Modal,
    Form,
    Icon,
} from 'semantic-ui-react'

export function UpdateSale({ selectedSale, onSaleUpdated }) {
    const [open, setOpen] = useState(false);

    const [updatedSale, setUpdatedSale] = useState({
        Id: selectedSale.Id || '',
        customerId: selectedSale?.customerId || '',
        productId: selectedSale?.productId || '',
        storeId: selectedSale?.storeId || '',
        dateSold: selectedSale?.dateSold || new Date(),
    });

    const newdateSold = new Date(updatedSale.dateSold);

    const handleCustomerSelect = (customerId) => {
        setUpdatedSale({ ...updatedSale, customerId });
    };

    const handleProductSelect = (productId) => {
        setUpdatedSale({ ...updatedSale, productId });
    };

    const handleStoreSelect = (storeId) => {
        setUpdatedSale({ ...updatedSale, storeId });
    };

    const handleDateChange = (dateSold) => {
        setUpdatedSale({ ...updatedSale, dateSold });
    };

    const handleSubmit = () => {
        
            fetch('/sale/update/' + selectedSale.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedSale),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                   
                })
                .then((updatedSale) => {
                    onSaleUpdated(updatedSale);
                    setOpen(false);
                })
                .catch((error) => {
                    console.error('Error Updating form:', error);
                });
        };
  
    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button color='yellow' icon labelPosition='left'><Icon name='edit' />Edit</Button>}
            size='tiny'
        >
            <ModalHeader>Edit Sale</ModalHeader>
            <ModalContent>
                <Form>
                    <Form.Field>
                        <label>DaleSold</label>
                        <DatePicker onChange={handleDateChange} value={newdateSold.toLocaleDateString('en-US', 'MM/DD/YYYY')} />
                    </Form.Field>
                    <Form.Field>
                        <label>Customer</label>
                        <CustomerDropdown onSelectCustomer={handleCustomerSelect} value={updatedSale.customerId} />
                    </Form.Field>
                    <Form.Field>
                        <label>Product</label>
                        <ProductDropdown onSelectProduct={handleProductSelect} value={updatedSale.productId} />
                    </Form.Field>
                    <Form.Field>
                        <label>Store</label>
                        <StoreDropdown onSelectStore={handleStoreSelect} value={updatedSale.storeId} />
                    </Form.Field>
                </Form>
            </ModalContent>
            <ModalActions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button
                    content="Edit"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={handleSubmit}
                    positive
                />
            </ModalActions>
        </Modal>
    )
}

export default UpdateSale